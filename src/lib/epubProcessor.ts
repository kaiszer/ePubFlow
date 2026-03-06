import JSZip from 'jszip';

/**
 * Applies bold tagging to the first two letters of each word
 * matching the legacy Python BeautifulSoup behavior.
 * 
 * @param text Origin text content
 * @returns HTML string with <b> tag wrapper matching the exact legacy python regex logic.
 */
export const makeFirstLettersBold = (text: string): string => {
  return text.replace(/(\b[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]{2})([a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]*)/g, (_match, p1, p2) => {
    return p1.length === 2 
      ? `<b>${p1[0]}</b>${p1[1]}` 
      : `<b>${p1}</b>${p2}`;
  });
};

/**
 * Process a given EPUB file inside the browser and return the modified EPUB as a Blob.
 * 
 * @param file The Epub Blob / File object uploaded by user
 * @returns The new Epub File Blob formatted
 */
export const processEpub = async (file: File): Promise<Blob> => {
  const zip = new JSZip();
  const loadedZip = await zip.loadAsync(file);
  const parser = new DOMParser();
  const serializer = new XMLSerializer();

  // Iterate over all files in the EPUB to find HTML/XHTML
  const fileNames = Object.keys(loadedZip.files);
  for (const fileName of fileNames) {
    // Only target HTML/XHTML pages
    if (fileName.match(/\.(xhtml|html|htm)$/i)) {
      const fileData = await loadedZip.files[fileName].async('string');
      
      // Parse the HTML/XML
      const doc = parser.parseFromString(fileData, 'application/xhtml+xml');
      
      // Identify nodes containing text that should be processed 
      const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
        acceptNode: function(node) {
          if (!node.parentNode) return NodeFilter.FILTER_REJECT;
          const parentName = node.parentNode.nodeName.toLowerCase();
          
          // Ignore style, script elements, titles, etc
          if (['script', 'style', 'title', 'head'].includes(parentName)) {
            return NodeFilter.FILTER_REJECT;
          }
          if (!node.textContent?.trim()) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      const nodesToReplace: { oldNode: Text, newNodeFragment: DocumentFragment }[] = [];
      let currentNode;
      
      // We must avoid mutating the DOM tree while walking it to NOT break the NodeWalker
      while ((currentNode = walker.nextNode())) {
        const textNode = currentNode as Text;
        const formattedHtml = makeFirstLettersBold(textNode.textContent || '');
        if (formattedHtml !== textNode.textContent) {
           
           // We create a temporary span in the same XML namespace (required for xhtml)
           const tempDiv = doc.createElementNS('http://www.w3.org/1999/xhtml', 'span');
           tempDiv.innerHTML = formattedHtml;
           
           const fragment = doc.createDocumentFragment();
           while (tempDiv.firstChild) {
             fragment.appendChild(tempDiv.firstChild);
           }
           nodesToReplace.push({ oldNode: textNode, newNodeFragment: fragment });
        }
      }

      // Execute replacements
      for (const { oldNode, newNodeFragment } of nodesToReplace) {
        if (oldNode.parentNode) {
          oldNode.parentNode.replaceChild(newNodeFragment, oldNode);
        }
      }

      // Serialize back to string
      const newXhtml = serializer.serializeToString(doc);
      loadedZip.file(fileName, newXhtml);
    }
  }

  // Generate the new EPUB zip file 
  const content = await loadedZip.generateAsync({ type: 'blob', mimeType: 'application/epub+zip' });
  return content;
};

import JSZip from 'jszip';
import { makeFirstLettersBold } from '../utils/textFormatting';
import { useAppStore } from '../features/store/useAppStore';

/**
 * Silently extracts the EPUB cover from the uploaded file and commits it to Zustand global store.
 * Safe to call implicitly on file drop.
 */
export const extractEpubCoverAndStore = async (file: File): Promise<void> => {
  try {
    const zip = new JSZip();
    const loadedZip = await zip.loadAsync(file);
    const parser = new DOMParser();

    const rootFiles = Object.keys(loadedZip.files).filter(name => name.endsWith('.opf'));
    if (rootFiles.length > 0) {
      const opfData = await loadedZip.files[rootFiles[0]].async('string');
      const opfDoc = parser.parseFromString(opfData, 'application/xml');
      
      const coverMeta = opfDoc.querySelector('meta[name="cover"]');
      if (coverMeta) {
         const coverId = coverMeta.getAttribute('content');
         if (coverId) {
           const coverItem = opfDoc.querySelector(`item[id="${coverId}"]`);
           if (coverItem) {
             const coverHref = coverItem.getAttribute('href');
             
             if (coverHref) {
               const parts = rootFiles[0].split('/');
               parts.pop();
               const basePath = parts.length > 0 ? parts.join('/') + '/' : '';
               const fullCoverPath = basePath + coverHref;
               
               const coverFile = loadedZip.files[fullCoverPath];
               if (coverFile) {
                  const base64Data = await coverFile.async('base64');
                  const ext = fullCoverPath.split('.').pop()?.toLowerCase();
                  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
                  useAppStore.getState().setCoverUrl(`data:${mime};base64,${base64Data}`);
               }
             }
           }
         }
      }
    }
  } catch (err) {
    console.warn("Cover extraction silently failed:", err);
  }
};

/**
 * Process a given EPUB file inside the browser and return the modified EPUB as a Blob.
 * 
 * @param file The Epub Blob / File object uploaded by user
 * @param intensity The Bionic Reading intensity mapping
 * @returns The new Epub File Blob formatted
 */
export const processEpub = async (file: File, intensity: number = 2): Promise<Blob> => {
  try {
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
          const formattedHtml = makeFirstLettersBold(textNode.textContent || '', intensity);
          if (formattedHtml !== textNode.textContent) {
             // Create a temporary HTML document to parse the string, which safely handles HTML entities like &nbsp;
             const tempHtmlDoc = new DOMParser().parseFromString(formattedHtml, 'text/html');
             
             // Create a document fragment in the context of our *target* XHTML document
             const fragment = doc.createDocumentFragment();
             
             // Move all nodes from the temporary HTML body into our fragment
             const tempBodyNodes = Array.from(tempHtmlDoc.body.childNodes);
             for (const node of tempBodyNodes) {
               // We must import the node so it belongs to the target doc's XML namespace
               const importedNode = doc.importNode(node, true);
               fragment.appendChild(importedNode);
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
  } catch (error) {
    console.error("DEBUG processEpub threw inner exception:", error);
    throw error;
  }
};

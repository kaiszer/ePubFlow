__license__   = 'GPL v3'
__copyright__ = '2024, Andres Alfaro'
__docformat__ = 'restructuredtext en'


import os

from calibre.customize import FileTypePlugin


class ePubFlow(FileTypePlugin):

    name                = 'ePubFlow' # Name of the plugin
    description         = 'This script is focused on improving the reading and comprehension of EPUB files for neurotypical readers'
    supported_platforms = ['windows', 'osx', 'linux'] # Platforms this plugin will run on
    author              = 'Andres Alfaro' # The author of this plugin
    version             = (1, 0, 0)   # The version number of this plugin
    file_types          = {'epub'} # The file types that this plugin will be applied to
    on_postprocess      = True # Run this plugin after conversion is complete
    minimum_calibre_version = (0, 7, 53)

    def run(self, path_to_ebook):
        from calibre.ebooks.metadata.meta import get_metadata, set_metadata
        with open(path_to_ebook, 'r+b') as file:
            ext  = os.path.splitext(path_to_ebook)[-1][1:].lower()
            mi = get_metadata(file, ext)
            mi.publisher = 'Hello World'
            set_metadata(file, mi, ext)
        return path_to_ebook
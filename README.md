# ImageKit Rails/React Demo

The purpose of this application is to relieve a Rails application from the responsibility of also being a file server. While Active Storage is a useful tool and a viable option, [ImageKit](http://imagekit.io)'s ease of use and extended utility make it a very attractive option for projects that may wish to handle image files from the front-end. On top of that, there's little danger of a deployed database getting unwieldy and difficult to back up/move/restore, since records of stored images through URLs take up vastly less space than the binaries for those images themselves.

## Video Uploads to ImageKit

While ImageKit supports uploading and displaying videos, I have not yet tested this feature, and I consider it outside the scope of this project. Moreover, Video files can grow to unwieldy sizes very quickly,

## Project Tour

The root of the project is the Rails app, and the corresponding React site can be found in the `client` directory.

The file input in `App.jsx` handles the file selection and temporarily places it on the DOM via an `<img>` tag's `src` property. When the file is submitted, it is packaged into a FormData object and sent to Rails.

In the `app/controllers/image_controller.rb` file in Rails, the file (via `file` and `fileName` properties) immediately passes to the `Image::ik_upload` class method in `app/models/image.rb`, where it is passed to ImageKit via the `imagekit` gem.

The response ImageKit provides the information we will actually store in our database, most notably the ImageKit URL that will allow us to use the image in the future. That ImageKit URL is probably the best choice to use user/administrator-uploaded images in a project, which is the intention behind this project to begin with.

### Using a different component library

This project uses the open-source [Mantine component library](https://mantine.dev/) on the frontend, but the logic underpinning everything should match if you are using Bootstrap, Material UI, or another component library. For an example of a totally generic React page that handles data from a file input, check out [this gist I wrote for that purpose.](https://gist.github.com/thompsonplyler/61499ea7334b0d81025393a7b8a5e8f1)

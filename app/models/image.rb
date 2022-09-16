class Image < ApplicationRecord

    def self.ik_upload(image_params)
        @imagekitio = ImageKitIo.client
        file = image_params[:file]
        file_name = image_params[:fileName]

        response = @imagekitio.upload_file(
            file: file, # required
            file_name: file_name,  # required
            response_fields: 'isPrivateFile, tags',
            tags: %w[abc def],
            use_unique_file_name: true
        )

        # the response and response[:raw_body] 
        # have a lot more information than this,
        # but for the purposes of this illustration,
        # these values work to return to the image creation tool
        
        @url = JSON.parse(response[:raw_body])["url"]
        @file_name = JSON.parse(response[:raw_body])["name"]
        @ik_id = JSON.parse(response[:raw_body])["fileId"]
        {url: @url, file_name: @file_name, ik_id: @ik_id}
    end

end

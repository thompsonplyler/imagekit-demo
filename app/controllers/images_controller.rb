class ImagesController < ApplicationController
        
    def index
        all = Image.all
        render json: all
    end

    def new
        @image = Image.new(image_params)
    end

    def create
        # upon receiving the file information from the frontend
        # the app invokes a class method. Rails does not do very much
        # handling of the image binary itself but acts as a 
        # ferry between the frontend and Imagekit. 
        @ex_params = Image.ik_upload(image_params)

        # the @ex_params contains the information from our ImageKit upload...
        @image = Image.new(@ex_params)
        # and THAT is what is saved to the database.
        @image.save
        # what gets passed back to the front-end on App.jsx:63 and eventually loaded
        # into the <img> element on App.jsx:89 via the state update 
        # on App.jsx:64 is the ImageKit url that is now hosting the uploaded image. 
        render json: {data: @image, status: :ok}
    end

    def destroy
        @image = Image.find(image_params[:id])
        @image.destroy
    end

    def update
    end

    private

    def image_params
        params.permit(:id, :file, :fileName)
    end
end

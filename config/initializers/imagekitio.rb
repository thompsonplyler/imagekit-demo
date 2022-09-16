ImageKitIo.configure do |config|
    if Rails.env.development?
      config.public_key = ENV["IK_PUBLIC_KEY"]
      config.private_key = ENV["IK_PRIVATE_KEY"]
      config.url_endpoint = ENV["IK_HOST"] # https://ik.imagekit.io/your_imagekit_id
    end
    config.service = :carrierwave
    # config.constants.MISSING_PRIVATE_KEY = 'custom error message'
  end
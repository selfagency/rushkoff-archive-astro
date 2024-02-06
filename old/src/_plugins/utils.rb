require 'youtube_rails'

module Jekyll
  module Utils
    module UtilFilters
      def embeddable_img(input)
        return input unless input.is_a? String

        YouTubeRails.extract_video_image(input)
      end
      
      def embeddable(input)
        return input unless input.is_a? String

        YouTubeRails.youtube_embed_url(input)
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::Utils::UtilFilters)

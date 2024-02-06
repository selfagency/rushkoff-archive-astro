#!/bin/env ruby

# Downloads the Rushkoff Archive posts from dataUrl, and outputs as TSV

require 'json'
require 'net/http'
require 'uri'


dataUrl = "https://api.archive.rushkoff.com/posts?_limit=-1"

def outputTsv(data)
  headers = data[0].keys
  ix = headers.find_index('title')
  headers.insert(ix+1, 'subtitle')
  puts headers.join("\t")

  data.each do |a|
    a['publication'] = a['publication']['title']
    a['subtitle'] = '' # insert this field
    
    row = headers.map do |f|
      case a[f]
      when nil
        ""
      when Hash, String
        JSON.generate(a[f])[1..-2]
      else
        String(a[f]);
      end
    end
    puts row.join("\t")
  end
end

def fetch(url)
  uri = URI(url.to_s)

  Net::HTTP.get(uri)
end

outputTsv JSON.parse fetch dataUrl

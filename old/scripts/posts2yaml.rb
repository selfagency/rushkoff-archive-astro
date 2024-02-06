#!/bin/env ruby

# Downloads the Rushkoff Archive posts from dataUrl, and outputs as
# YAML in a directory 'docs/' (which is one of the options GH Pages
# offers)

require 'json'
require 'net/http'
require 'uri'
require 'yaml'
require 'fileutils'

path = 'docs/_articles'
dataUrl = "https://api.archive.rushkoff.com/posts?_limit=-1"

def outputYaml(path, data)
  headers = data[0].keys
  slugs = {}
  
  data.each do |a|
    title = a['title']
    id = "%04d" % a['id']
    slug = id+'-'+a['title']
                    .strip
                    .downcase
                    .gsub(/[^\s\w]+/, '')
                    .gsub(/\s+/, '-')[0,40]
    name = "#{path}/#{slug}.md"
    body = a.delete 'body'
    a['slug'] = slug
    a['publication'] = a['publication']['title']
                         
    if slugs[title] then
      slugs[title] += 1
      warn "Potential name clash: title #{title} appears #{slugs[title]} times"
    end

    slugs[title] = 1
    if File.exist? name then
      warn "Overwriting #{name}"
    else
      warn "Writing #{name}"
    end
    File.open(name, 'w') do |str|
      str.puts a.to_yaml
      str.puts "---\n", body
    end
  end
end

def fetch(url)
  uri = URI(url.to_s)

  Net::HTTP.get(uri)
end

FileUtils.rmtree(path) if File.exist?(path)
FileUtils.mkpath(path)
outputYaml path, JSON.parse(fetch dataUrl)

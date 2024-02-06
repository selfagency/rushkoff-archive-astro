#!/bin/env ruby

# Reads a TSV dump of the Rushkoff Archive posts from STDIN, and outputs as
# YAML in a directory 'docs/' (which is one of the options GH Pages
# offers)

require 'uri'
require 'yaml'
require 'fileutils'

path = 'docs/_articles'

def outputYaml(path)
  slugs = {}
  headers = nil
  
  $stdin.each do |row|
    row.chomp!
    if headers
      fields = row.split("\t").map {|f| f == ''? nil : f}
      a = headers.zip(fields).to_h
    else
      headers = row.split("\t")
      next
    end

    # Convert certain fields from strings/nils
    a['id'] = a['id'].to_i
    a['published'] = a['published'].to_s.downcase == 'true'
    a['body']
    
    title = a['title']

    # Generate a slug
    id = "%04d" % a['id']
    slug = id+'-'+a['title']
                    .strip
                    .downcase
                    .gsub(/[^\s\w]+/, '')
                    .gsub(/\s+/, '-')[0,40]
    name = "#{path}/#{slug}.md"
    body = a.delete('body')
             .to_s
             .gsub(/\\n/,"\n")
             .gsub(/\\t/, "\t")
             .gsub(/\\"/, '"')
    a['slug'] = slug
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

FileUtils.rmtree(path) if File.exist?(path)
FileUtils.mkpath(path)

outputYaml path

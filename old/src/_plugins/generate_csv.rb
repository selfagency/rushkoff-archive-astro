require 'json' 

module Jekyll

  class CSVPostGenerator < Generator
    safe true

    def generate(site)

      base_dir = "#{site.dest}/csv"
      FileUtils.mkdir_p base_dir

      index_file = "csv/index.html"

      # Prevent Jekyll's clean-up from nobblin this file
      # https://github.com/jekyll/jekyll/issues/5162#issuecomment-236321908
      site.keep_files << index_file

      # Write the index file
      File.open("#{site.dest}/#{index_file}", 'w') do |out|
        out << "<html><head><title>CSV Index</title></head><body><ul>"
        site.collections.each do |name, coll|
          out << "<li> <a href=\"#{name}.csv\">#{name}.csv</a>"
        end
        out << "</ul></body></html>"
      end

      # Write the CSV files
      site.collections.each do |name, coll|
        csv_file = "csv/#{coll.label}.csv"
        csv_path = "#{site.dest}/#{csv_file}"
        
        warn "Collection #{name} -> #{csv_path}"

       # Prevent Jekyll's clean-up from nobbling this file
        site.keep_files << csv_file

        # Compute the list of headings
        headings = coll.docs.reduce([]) do |prev,item|
          prev.union(item.data.keys)
        end
        headings.delete('excerpt')
        
        # warn headings.inspect

        # Write the data
        CSV.open(csv_path, 'w') do |csv|
          csv << headings
          coll.docs.each do |doc|
            # warn "Generating CSV for #{doc.path} -> #{doc.data}}"
            csv << headings.map {|h| flatten doc.data[h] }
          end
        end
      end

    end

    def flatten(something)
      case something
      when Array
        case something.size
        when 0
          nil

        else
          something.map do |it|
            if it.gsub("'", "\\'")
              "'"+it+"'"
            else
              it
            end
          end  
            .join(",")
        end
        
      else
        something
      end
    end

    def render_json(post, site)

      #add `json: false` to YAML to prevent JSONification
      if post.data.has_key? "json" and !post.data["json"]
        return
      end

      path = post.destination( site.source )

      #only act on post/pages index in /index.html
      return if /\/index\.html$/.match(path).nil?

      #change file path
      path['/index.html'] = '.json'

      #render post using no template(s)
      post.render( {}, site.site_payload)

      #prepare output for JSON
      #post.data["related_posts"] = related_posts(post,site)
      output = post.to_liquid
      #output["next"] = output["next"].id unless output["next"].nil?
      #output["previous"] = output["previous"].id unless output["previous"].nil?

      #write
      #todo, figure out how to overwrite post.destination 
      #so we can just use post.write
      FileUtils.mkdir_p(File.dirname(path))
      warn "writing #{path}"
      File.open(path, 'w') do |f|
        f.write(output.to_json)
      end
    end

    def related_posts(post, site)

      related = []
      return related unless post.instance_of?(Post)

      post.related_posts(site.posts).each do |post|
        related.push :url => post.url, :id => post.id, :title => post.to_liquid["title"]
      end

      related

    end
  end
end

class CreateImages < ActiveRecord::Migration[6.1]
  def change
    create_table :images do |t|
      t.string :url
      t.string :ik_id
      t.string :file_name
      t.timestamps
    end
  end
end

class InsertException < StandardError
  attr_reader :insertData
  def initialize(msg="", insertData="")
    @insertData = insertData
    super(msg)
  end
end


class DeleteException < StandardError
  attr_reader :deleteId
  attr_reader :deleteData
  def initialize(msg="", deleteId="", deleteData="")
    @deleteId = deleteId
    @deleteData = deleteData
    super(msg)
  end
end


class UpdateException < StandardError
  attr_reader :updateId
  attr_reader :updateData
  def initialize(msg="", updateId="", updateData="")
    @updateId = updateId
    @updateData = updateData
    super(msg)
  end
end


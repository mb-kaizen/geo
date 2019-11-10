require 'test_helper'

class TelescopeControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get telescope_show_url
    assert_response :success
  end

end

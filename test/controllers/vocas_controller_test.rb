require 'test_helper'

class VocasControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get vocas_index_url
    assert_response :success
  end

  test "should get show" do
    get vocas_show_url
    assert_response :success
  end

  test "should get new" do
    get vocas_new_url
    assert_response :success
  end

  test "should get edit" do
    get vocas_edit_url
    assert_response :success
  end

end

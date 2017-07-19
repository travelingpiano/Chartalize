class Api::DataTablesController < ApplicationController
  def create
    @data_table = DataTable.new(data_table_params)
    @data_table.user_id = current_user.id
    if @data_table.save
      render :show
    else
      errors = @data_table.errors.full_messages
      render json: errors
    end
  end

  def index
    @data_tables = DataTable.all
    render :index
  end

  def show
    @data_table = DataTable.find(params[:id])
    puts @data_table
    render :show
  end

  private
  def data_table_params
    params.require(:data_table).permit!
  end
end

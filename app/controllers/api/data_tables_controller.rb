class Api::DataTablesController < ApplicationController
  def create
    @data_table = DataTable.new(data_table_params)
    @data_table.user_id = current_user.id
    puts @data_table.user_id
    if @data_table.save
      render :create
    else
      errors = @data_table.errors.full_messages
      render json: errors, status: 422
    end
  end

  def index
    alldata_tables = DataTable.all
    @data_tables = []
    alldata_tables.each do |data_table|
      @data_tables.push(data_table) if data_table.user.id == current_user.id
    end
    render :index
  end

  def destroy
    @data_table = DataTable.find(params[:id])
    @data_table.destroy
    render :show
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

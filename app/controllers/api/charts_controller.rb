class Api::ChartsController < ApplicationController
  def create
    @chart = Chart.new(chart_params);
    @chart.user_id = current_user.id;
    if @chart.save
      render :show
    else
      errors = @chart.errors.full_messages;
      puts errors;
      render json: errors, status: 422
    end
  end

  def index
    @charts = Chart.all
    render :index
  end

  def show
    @chart = Chart.find(params[:id])
    render :show
  end

  def destroy
    @chart = Chart.find(params[:id])
    @chart.destroy
    render :show
  end

  def update
    @chart = Chart.find(params[:id])
    if @chart.update_attributes(chart_params)
      render :show
    else
      errors = ['Edit Failed']
      render json: errors, status: 400
    end
  end

  private
  def chart_params
    params.require(:chart).permit!
  end
end

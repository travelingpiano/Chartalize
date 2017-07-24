class Api::ChartsController < ApplicationController
  def create
    @chart = Chart.new(chart_params);
    if @chart.save
      render :show
    else
      errors = @chart.errors.full_messages;
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
  
  private
  def chart_params
    params.require(:chart).permit!
  end
end

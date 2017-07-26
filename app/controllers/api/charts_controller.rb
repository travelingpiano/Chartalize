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
    allcharts = Chart.all
    @charts = []
    allcharts.each do |chart|
      @charts.push(chart) if chart.user.id == current_user.id
    end
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
    if params[:chart] == nil
      @chart.update_attribute("shared_users",[])
      render :show
    elsif @chart.update_attributes(chart_params)
      render :show
    else
      errors = ['Edit Failed']
      render json: errors, status: 400
    end
  end

  def shared
    @charts = Chart.all.select{|chart| chart.shared_users.include?(current_user.username)}
    render :index
  end

  private
  def chart_params
    params.require(:chart).permit!
  end
end

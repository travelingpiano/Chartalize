class Api::ChartsController < ApplicationController
  def create
    @chart = Chart.new(chart_params)
    @chart.user_id = current_user.id
    if @chart.save
      render :show
    else
      errors = @chart.errors.full_messages;
      puts errors;
      render json: errors, status: 422
    end
  end

  def index
    @charts = Chart.where(['user_id = ?' ,current_user.id])
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

  def shared_show
    @chart = Chart.find(params[:id])
    if !@chart.shared_users.include?(current_user.username)
      errors = ['You were not shared this chart!']
      render json: errors, status: 404
    else
      render :show
    end
  end

  private
  def chart_params
    params.require(:chart).permit!
  end
end

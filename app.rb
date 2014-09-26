require 'sinatra'
require 'sinatra/jsonp'
require 'rubygems'
require 'twitter'
require 'omniauth-twitter'
require 'json'
require 'sinatra/cross_origin'
require 'stripe'
load 'config.rb'




Stripe.api_key = configatron.stripe_api_secret

configure do
  enable :sessions
  enable :cross_origin
end

helpers Sinatra::Jsonp

helpers do
  def admin?
    session[:admin]
  end
end

use OmniAuth::Builder do
  provider :twitter, configatron.twitter_key, configatron.twitter_secret
end

twitter_client = nil

before do
   redirect to("/auth/twitter") unless admin? || params[:oauth_token] != nil
   twitter_client = Twitter::REST::Client.new do |config|
    config.consumer_key        = configatron.twitter_key
    config.consumer_secret     = configatron.twitter_secret
    config.access_token        = session[:token]
    config.access_token_secret = session[:secret]
  end
end



get '/login' do
  redirect to("/auth/twitter")
end

get '/auth/twitter/callback' do
  env['omniauth.auth'] ? session[:admin] = true : halt(401,'Not Authorized')
  session[:token] = env['omniauth.auth']['credentials']['token']
  session[:secret] = env['omniauth.auth']['credentials']['secret']
  redirect to('http://localhost:9000')
end

get '/api/sprout-user' do
  jsonp  twitter_client.user.attrs
end

get '/api/lists' do
  jsonp twitter_client.lists.map(&:attrs)
end

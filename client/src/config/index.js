const baseUrl = window.location.origin

const app = {
    redirect_url: baseUrl + '/callback',
    api_url: 'http://localhost:5000/api',
    // api_url: 'http://agent.upayz.asia/api'
}

const config = {
    app
}
export default config

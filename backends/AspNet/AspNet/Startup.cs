using Newtonsoft.Json.Serialization;
using Microsoft.Owin.Cors;
using Owin;
using System.Web.Http;

namespace AspNet
{
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            HttpConfiguration config = new HttpConfiguration();
            config.Routes.MapHttpRoute(
                name: "TodosApi",
                routeTemplate: "{controller}/{id}",
                defaults: new {  id = RouteParameter.Optional }
            );

            var json = config.Formatters.JsonFormatter;
            json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            appBuilder.UseCors(CorsOptions.AllowAll);
            appBuilder.UseWebApi(config);
        }
    }
}

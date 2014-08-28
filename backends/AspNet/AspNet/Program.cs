using Microsoft.Owin.Hosting;
using System;
using System.Net.Http;

namespace AspNet
{
    public class Program
    {
        static void Main(string[] args)
        {
            string baseAddress = "http://localhost:9001/";

            using (WebApp.Start<Startup>(url: baseAddress))
            {
                Console.WriteLine("Press Enter to quit.");
                Console.ReadKey();
            }
        }
    }
}

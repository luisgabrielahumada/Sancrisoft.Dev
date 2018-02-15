using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Bussiness.Infrastructure.Core.Repository.DataBase;
using Arquitectura.Bussiness.Infrastructure.Database.Context;
using Arquitectura.Bussiness.Task.Rules.Repository.Security;
using Arquitectura.Bussiness.Task.Rules.Services.Security;
using Bussiness.Administrator.Task;
using Bussiness.Administrator.Task.Services;
using Configuration.Services.Task;
using Ninject;
using Process.Services.Task;
using System.Configuration;
using System.Web.Http;
using System.Web.Http.Dispatcher;

namespace FinanControl.Bussiness.Domine.ServiceLocation
{
    public static class NinjectBindingsConfigurator
    {
        public static StandardKernel _kernel;

        public static void Start()
        {          
            _kernel = new StandardKernel();
            

            _kernel.Bind<IHttpControllerActivator>()
                   .To<NinjectKActivator>()
                   .InSingletonScope()
                   .WithConstructorArgument("kernel", _kernel);

            _kernel.Bind<IDbContext>().To<EntityDBContext>().WithConstructorArgument("connectionString", ConfigurationManager.ConnectionStrings["ConnectionString.Bussiness.Web"].ConnectionString);
            _kernel.Bind(typeof(IRepositoryBase<>)).To(typeof(RepositoryEvents<>));
            _kernel.Bind<IUsers>().To<UserServices>();
            _kernel.Bind<IProfiles>().To<ProfilesServices>();
            _kernel.Bind<IAuth>().To<AuthServices>();
            _kernel.Bind<IMenus>().To<MenusServices>();
            _kernel.Bind<IProfilesMenu>().To<ProfileMenusServices>();
            _kernel.Bind<ICities>().To<CitiesServices>();
            _kernel.Bind<ICountries>().To<CountriesServices>();
            _kernel.Bind<IMessages>().To<MessagesServices>();
            _kernel.Bind<ICustomer>().To<CustomerServices>();
            _kernel.Bind<IIncome>().To<IncomeServices>();
            _kernel.Bind<IExpenses>().To<ExpensesServices>();
            _kernel.Bind<IBalanceSheet>().To<BalanceSheetService>();
            _kernel.Bind<IInscriptions>().To<InscriptionServices>();
            _kernel.Bind<ICharges>().To<ChargeServices>();
            _kernel.Bind<IUploadFiles>().To<UploadFileServices>();

            GlobalConfiguration.Configuration.DependencyResolver = new LoadNinjectResolver(
                _kernel, GlobalConfiguration.Configuration.DependencyResolver
            );
        }
    }
}

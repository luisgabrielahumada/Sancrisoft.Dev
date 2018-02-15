using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Core.DomainExceptions;
using Arquitectura.Core.Helper;
using Arquitectura.Entity.Model.Models;
using Process.Entity.Models;
using Sancrisoft.Services.Task.Helper;
using System;

namespace Process.Services.Task
{
    public class InscriptionServices : IInscriptions
    {
        private IRepositoryBase<Inscriptions> db;
        private IRepositoryBase<ServerOfEmails> dbEmail;
        private IRepositoryBase<Charges> dbCharge;
        public InscriptionServices(IRepositoryBase<Inscriptions> _db, IRepositoryBase<ServerOfEmails> _dbEmail, IRepositoryBase<Charges> _dbCharge)
        {
            db = _db;
            dbEmail = _dbEmail;
            dbCharge = _dbCharge;
        }

        public Inscriptions Get(Guid item)
        {
            return db.Get(item);
        }

        public PagerRecord<Inscriptions> Get(int PageSize, int PageNumber)
        {
            int PageTotal = 0;
            return db.GetQuery(out PageTotal, PageSize, PageNumber);
        }

        public Guid Insert(Inscriptions item, Guid UpdatedId)
        {
            Check.IsNotNull(item.lastName, $"Nombre Requerido {item.lastName}.");
            Check.IsNotNull(item.firstName, $"Apellidos Requerido {item.firstName}.");
            Check.IsNotNull(item.email, $"Email Requerido {item.email}.");
            Check.IsNotNull(item.phone, $"Telefono Requerido {item.phone}.");
            Check.IsNotNull(item.birthDate, $"Fecha Nacimiento Requerido {item.birthDate}.");
            item.State = ObjectState.Added;
            var id=db.Save(item);
            var rowEmail = dbEmail.GetByWhere(e => e.isDefault == true);
            String body = $@"Estimado {item.firstName} {item.lastName} <br/>  <br/> 
                            Nos alegra que hayas querido formar parte de nuestro equipo! Hemos recibido  <br/>  <br/> 
                            satisfactoriamente todos tus datos, los revisaremmos y te daremos respuesta a la
                            brevedad posible.
                            ";
            SendEmail emailParticipant = new SendEmail(item.email, "no-reply@sancrisoft.com", "Hemo Recibido tu Aplicación!", body, true);
            emailParticipant.SubmitEmail(rowEmail.host, rowEmail.port, rowEmail.isEnableSSl, rowEmail.isUseCredencial, rowEmail.user, rowEmail.password);

            var itemCharge=dbCharge.Get(item.charge.Id);
            body = $@"Una nueva aplicación ha sido recibida. <br/> <br/> 
                           Aplicante: {item.firstName} {item.lastName}  <br/> <br/> 
                           Cargo: {itemCharge.name} <br/> <br/> 
                           Enlace: http://{rowEmail.webSite}Inscription/{id} <br/> <br/> 
                            ";
            SendEmail emailadminstrator = new SendEmail(rowEmail.emailAdministrator, "no-reply@sancrisoft.com", "Nueva aplicación Recibida!", body, true);
            emailadminstrator.SubmitEmail(rowEmail.host, rowEmail.port, rowEmail.isEnableSSl, rowEmail.isUseCredencial, rowEmail.user, rowEmail.password);
            return id;
        }

        public void Update(Guid id, Inscriptions item, Guid UpdatedId)
        {
            throw new NotImplementedException();
        }
    }
}

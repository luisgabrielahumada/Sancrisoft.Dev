
using Arquitectura.Entity.Model.Models;
using System;
using Arquirectura.Helper.Core.Enumumerable;
namespace Process.Entity.Models
{
    public partial class Resolution : BaseEntity
    {
        private TypeResolution _type;
        public String Prefix { set; get; }
        public String Description { set; get; }
        public String InitialRange { set; get; }
        public String FinalRange { set; get; }
        public DateTimeOffset Expiration { set; get; }
        public String CurrentRange { set; get; }
        public TypeResolution Type
        {
            set { _type = value; }
            get { return _type; }
        }
        public String TypeDescription
        {
            get { return _type.GetStringValue(); }
        }
    }
}

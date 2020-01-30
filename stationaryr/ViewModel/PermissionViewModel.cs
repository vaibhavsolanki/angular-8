using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace stationaryr.ViewModel
{
    public class PermissionViewModel
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }


        public static explicit operator PermissionViewModel(Models.ApplicationPermission permission)
        {
            return new PermissionViewModel
            {
                Name = permission.Name,
                Value = permission.Value,
                GroupName = permission.GroupName,
                Description = permission.Description
            };
        }
    }

    public class ClaimViewModel
    {
        public string Type { get; set; }
        public string Value { get; set; }
    }
}

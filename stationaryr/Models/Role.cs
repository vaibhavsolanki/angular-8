using Oracle.ManagedDataAccess.Client;
using Stationary.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace stationaryr.Models
{
    public class Role
    {
        string connection = "User ID=xuser;Connection Timeout=600;Password=xuser;data source=(DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST= 192.168.0.111)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME= dgh)));";


        public string Saverole(RoleViewModel Role)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_ROLE_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID","");
                cmd.Parameters.Add("P_NAME", Role.Name);
                cmd.Parameters.Add("P_DESCRIPTION", Role.Description);
                cmd.Parameters.Add("CALLVAL", "0");
                // cmd.ExecuteNonQuery();
                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
             
                con.Close();

            }
            return ret;
        }


        public string deleterole(string id)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_ROLE_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;

                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_NAME","");
                cmd.Parameters.Add("P_DESCRIPTION","");


                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;

        }

        public List<RoleViewModel> GetRoles()
        {
            List<RoleViewModel> ret = new List<RoleViewModel>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_ROLE_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID","");
                cmd.Parameters.Add("P_NAME", "");
                cmd.Parameters.Add("P_DESCRIPTION", "");


                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<RoleViewModel>();
            }
            return ret;
        }


        public List<RoleViewModel> getRoleId(string id)
        {
            List<RoleViewModel> ret = new List<RoleViewModel>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_ROLE_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);


                cmd.Parameters.Add("P_CONTRACTNO", "");
                cmd.Parameters.Add("P_VENDORNAME", "");
                cmd.Parameters.Add("P_STARTDATE", "");
                cmd.Parameters.Add("P_ENDDATE", "");


                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);





                ret = ds.ToList<RoleViewModel>();
            }
            return ret;

        }


    }
}

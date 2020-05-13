﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Data.Common;
using Oracle.ManagedDataAccess.Client;
using Oracle.ManagedDataAccess.Types;
using System.Configuration;
using System.Data;
using System.Data.OracleClient;
using System.Text.RegularExpressions;
using System.IO;
using Microsoft.Extensions.Configuration;
using System.Reflection;
using stationaryr.Models;
using stationaryr.ViewModel;
using System.Collections;

namespace Stationary.Models
{
    public class Data
    {
        string connection = "User ID=xuser;Connection Timeout=600;Password=xuser;data source=(DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST= 192.168.0.111)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME= dgh)));";
        //itissueitem


        public string SaveItIssueItems(AdminIssue itissueitems)
        {


            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_REQUEST_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_USERID", itissueitems.UserName);
                cmd.Parameters.Add("P_REMARKS", itissueitems.REMARKS);
                cmd.Parameters.Add("P_DEPT_ID", "");
                cmd.Parameters.Add("P_ISSUEITEMDATE", itissueitems.ISSUEDATE);
                cmd.Parameters.Add("CALLVAL", "0");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
                issueitem(itissueitems.ORDERITEM, ret);
            }
            return ret;
        }
        public string DeleteItIssueItems(string id)

        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_REQUEST_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);

                cmd.Parameters.Add("P_USERID", "");
                cmd.Parameters.Add("P_REMARKS", "");
                cmd.Parameters.Add("P_DEPT_ID", "");
                cmd.Parameters.Add("P_ISSUEITEMDATE", "");
                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();

            }
            return ret;
        }

        public List<itissueitems> GetItIssueItems()
        {

            List<itissueitems> ret = new List<itissueitems>();
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_REQUEST_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_USERID", "");
                cmd.Parameters.Add("P_REMARKS", "");
                cmd.Parameters.Add("P_DEPT_ID", "");
                cmd.Parameters.Add("P_ISSUEITEMDATE", "");
                
                    
                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<itissueitems>();

            }
            return ret;
        }



        public List<AdminIssue> GetItIssueItemsById(string id)
        {

            List<AdminIssue> ret = new List<AdminIssue>();
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_REQUEST_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);

                cmd.Parameters.Add("P_USERID", "");
                cmd.Parameters.Add("P_REMARKS", "");
                cmd.Parameters.Add("P_DEPT_ID", "");
                cmd.Parameters.Add("P_ISSUEITEMDATE", "");
                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<AdminIssue>();
                ret[0].ORDERITEM = GetItIssueItemsquantity(id);

            }
            return ret;
        }

        public List<ititems> GetItIssueItemsquantity(string issueid)
        {
            List<ititems> ret = new List<ititems>();
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_REQUEST_ITEMS", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_SUBCATEGORY", "");
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", "");

                cmd.Parameters.Add("P_QUANTITY", "");


                cmd.Parameters.Add("P_ISSUEID", issueid);
                cmd.Parameters.Add("P_REMARKS", "");
                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<ititems>(); ;

            }


            return ret;




        }

        public string UpdateIssueItems(AdminIssue AdminIssue)
        {

            return "";
        }

        public string issueitem(List<ititems> orderitem, string issueid)
        {
            string ret = "";
            foreach (var item in orderitem)
            {
                using (OracleConnection con = new OracleConnection(connection))
                {
                    con.Open();
                    OracleCommand cmd = new OracleCommand("STATIONARY_IT_REQUEST_ITEMS", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    OracleDataAdapter da = new OracleDataAdapter(cmd);
                    cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("P_ID", "");
                    cmd.Parameters.Add("P_CATEGORY", item.CATEGORY);
                    cmd.Parameters.Add("P_SUBCATEGORY", item.SUBCATEGORY);
                    cmd.Parameters.Add("P_SUBCHILDCATEGORY", item.SUBCHILDCATEGORY);

                    cmd.Parameters.Add("P_QUANTITY", item.QUANTITY);


                    cmd.Parameters.Add("P_ISSUEID", issueid);
                    cmd.Parameters.Add("P_REMARKS", item.REMARKS);
                    cmd.Parameters.Add("CALLVAL", "0");

                    DataTable ds = new DataTable();


                    da.Fill(ds);

                    ret = ds.Rows[0][0].ToString();

                }
            }

            return ret;

        }


        //itrealseorder


        public List<itemreceipt> GetItItemReceipt()
        {

            List<itemreceipt> ret = new List<itemreceipt>();
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_UPDATE_RECEIPT", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_RELEASEORDERID", "");
                cmd.Parameters.Add("P_CHALLANNO", "");
                cmd.Parameters.Add("P_CHALLANDATE", "");
                cmd.Parameters.Add("P_REMARKS", "");
                cmd.Parameters.Add("P_RECEIPTDATE", "");

                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<itemreceipt>();

            }
            return ret;
        }

        public List<itemreceipt> GetItItemReceiptById(int id)
        {

            List<itemreceipt> ret = new List<itemreceipt>();
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_UPDATE_RECEIPT", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_RELEASEORDERID", id);
                cmd.Parameters.Add("P_CHALLANNO", "");
                cmd.Parameters.Add("P_CHALLANDATE", "");
                cmd.Parameters.Add("P_REMARKS", "");
                cmd.Parameters.Add("P_RECEIPTDATE", "");

                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<itemreceipt>();
                ret[0].ORDERITEM = getordrtititems(id);
            }
            return ret;
        }

        public string SaveItItemReceipt(itemreceipt itemreceipt)
        {


            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_UPDATE_RECEIPT", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_RELEASEORDERID", itemreceipt.PUBLISHORDER);
                cmd.Parameters.Add("P_CHALLANNO", itemreceipt.CHALLANNO);
                cmd.Parameters.Add("P_CHALLANDATE", itemreceipt.CHALLANDATE);
                cmd.Parameters.Add("P_REMARKS", itemreceipt.REMARKS);
                cmd.Parameters.Add("P_RECEIPTDATE", itemreceipt.RECEIPTDATE);

                cmd.Parameters.Add("CALLVAL", "0");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
                ordrtititems(itemreceipt.ORDERITEM, itemreceipt.PUBLISHORDER);
            }
            return ret;
        }

        public List<ititems> getordrtititems( int publishorder)
        {

            List<ititems> ret = new List<ititems>();

            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_ITEM_RECEIPT", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_PUBLISHORDER", publishorder);
                cmd.Parameters.Add("P_CONTRACTID", "");

                cmd.Parameters.Add("P_QUANTITY", "");
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_SUBCATEGORY", "");
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", "");
                cmd.Parameters.Add("P_RECEIVEDQUANTITY", "");
                cmd.Parameters.Add("P_REMAINING", "");
                cmd.Parameters.Add("P_ITEM_REMARKS", "");
                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<ititems>();
            }
            return ret;
        }


        public string ordrtititems(List<ititems> orderitem, string publishorder)
        {
            string ret = "";
            foreach (var item in orderitem)
            {
                using (OracleConnection con = new OracleConnection(connection))
                {
                    con.Open();
                    OracleCommand cmd = new OracleCommand("STATIONARY_IT_ITEM_RECEIPT", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    OracleDataAdapter da = new OracleDataAdapter(cmd);
                    cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("P_ID", "");
                    cmd.Parameters.Add("P_PUBLISHORDER", publishorder);
                    cmd.Parameters.Add("P_CONTRACTID", item.CONTRACTID);

                    cmd.Parameters.Add("P_QUANTITY", item.QUANTITY);
                    cmd.Parameters.Add("P_CATEGORY", item.CATEGORY);
                    cmd.Parameters.Add("P_SUBCATEGORY", item.SUBCATEGORY);
                    cmd.Parameters.Add("P_SUBCHILDCATEGORY", item.SUBCHILDCATEGORY);
                    cmd.Parameters.Add("P_RECEIVEDQUANTITY", item.RECEIVEDQUANTITY);
                    cmd.Parameters.Add("P_REMAINING", item.REMAINING);
                    cmd.Parameters.Add("P_ITEM_REMARKS", item.REMARKS);
                    cmd.Parameters.Add("CALLVAL", "0");

                    DataTable ds = new DataTable();


                    da.Fill(ds);

                    ret = ds.Rows[0][0].ToString();

                }
            }

            return ret;

        }

        //itvendor
        public string SaveItVendor(itvendor itvendor)

        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_VENDOR_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_VENDORNAME", itvendor.VENDORNAME);
                cmd.Parameters.Add("P_PHONENO", itvendor.PHONENO);
                cmd.Parameters.Add("P_ADDRESS", itvendor.ADDRESS);
                cmd.Parameters.Add("P_TYPE", itvendor.APPTYPE);

                cmd.Parameters.Add("CALLVAL", "0");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();

            }
            return ret;
        }

        public string UpdateItVendor(itvendor itvendor)

        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_VENDOR_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", itvendor.ID);
                cmd.Parameters.Add("P_VENDORNAME", itvendor.VENDORNAME);
                cmd.Parameters.Add("P_PHONENO", itvendor.PHONENO);
                cmd.Parameters.Add("P_ADDRESS", itvendor.ADDRESS);
                cmd.Parameters.Add("P_TYPE", itvendor.APPTYPE);

                cmd.Parameters.Add("CALLVAL", "4");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();

            }
            return ret;
        }

        public string DeleteItVendor(int id)

        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_VENDOR_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_VENDORNAME", "");
                cmd.Parameters.Add("P_PHONENO", "");
                cmd.Parameters.Add("P_ADDRESS", "");
                cmd.Parameters.Add("P_TYPE", "");
                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();

            }
            return ret;
        }
        public List<itvendor> GetItVendor()

        {
            List<itvendor> ret = new List<itvendor>();
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_VENDOR_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_VENDORNAME", "");
                cmd.Parameters.Add("P_PHONENO", "");
                cmd.Parameters.Add("P_ADDRESS", "");
                cmd.Parameters.Add("P_TYPE", "");
                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<itvendor>();

            }
            return ret;
        }
        public List<itvendor> GetItVendorById(int id)

        {
            List<itvendor> ret = new List<itvendor>();
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_VENDOR_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_VENDORNAME", "");
                cmd.Parameters.Add("P_PHONENO", "");
                cmd.Parameters.Add("P_ADDRESS", "");
                cmd.Parameters.Add("P_TYPE", "");
                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<itvendor>();

            }
            return ret;
        }







        //itrelaseorder
        public List<itreleaseorder> getreleaseorder()

        {
            List<itreleaseorder> ret = new List<itreleaseorder>();
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_RELEASE_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_CONTRACTID", "");
                cmd.Parameters.Add("P_PUBLISHID", "");
                cmd.Parameters.Add("P_SUBJECT", "");
                cmd.Parameters.Add("P_BODY", "");

                cmd.Parameters.Add("P_SIGNATURE", "");
                cmd.Parameters.Add("P_RECEIVEDBY", "");

                cmd.Parameters.Add("P_RECEIVEDDATE", "");

                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<itreleaseorder>();

            }
            return ret;
        }




        public List<itreleaseorder> getreleaseorderbyid(int id)

        {
            List<itreleaseorder> ret = new List<itreleaseorder>();
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_RELEASE_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_CONTRACTID", "");
                cmd.Parameters.Add("P_PUBLISHID", "");
                cmd.Parameters.Add("P_SUBJECT", "");
                cmd.Parameters.Add("P_BODY", "");

                cmd.Parameters.Add("P_SIGNATURE", "");
                cmd.Parameters.Add("P_RECEIVEDBY", "");

                cmd.Parameters.Add("P_RECEIVEDDATE", "");

                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<itreleaseorder>();

            }
            return ret;
        }


        public string savereleaseorder(itreleaseorder itreleaseorder)

        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_RELEASE_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_CONTRACTID", itreleaseorder.CONTRACTID);
                cmd.Parameters.Add("P_PUBLISHID", itreleaseorder.RELEASEORDERID);
                cmd.Parameters.Add("P_SUBJECT", itreleaseorder.SUBJECT);
                cmd.Parameters.Add("P_BODY", itreleaseorder.BODY);

                cmd.Parameters.Add("P_SIGNATURE", itreleaseorder.SIGNATURE);
                cmd.Parameters.Add("P_RECEIVEDBY", itreleaseorder.RECEIVEDBY);

                cmd.Parameters.Add("P_RECEIVEDDATE", itreleaseorder.RECEIVEDDATE);

                cmd.Parameters.Add("CALLVAL", "0");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();

            }
            return ret;
        }


        public string deletereleaseorder(int id)

        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_IT_RELEASE_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_CONTRACTID", "");
                cmd.Parameters.Add("P_PUBLISHID", "");
                cmd.Parameters.Add("P_SUBJECT", "");
                cmd.Parameters.Add("P_BODY", "");

                cmd.Parameters.Add("P_SIGNATURE", "");
                cmd.Parameters.Add("P_RECEIVEDBY", "");

                cmd.Parameters.Add("P_RECEIVEDDATE", "");

                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();

            }
            return ret;
        }


        //report
        public static List<USER> getuser()
        {
            var numbers = new List<role>();
            numbers.Add(new role() { EMP_ID = "1", Approle = "STATIONARY" });
            numbers.Add(new role() { EMP_ID = "2", Approle = "IT" });
            List<USER> user = new List<USER>();
            user.Add(new USER { ID = "1", EMP_ID = "", NAME = "admin1", PASSWORD = "admin@1234", ROLE = "admin", APPROLE = numbers.Where(x => x.EMP_ID == "1").ToList() });
            user.Add(new USER { ID = "2", EMP_ID = "", NAME = "admin2", PASSWORD = "admin@12345", ROLE = "admin", APPROLE = numbers.Where(x => x.EMP_ID == "1" || x.EMP_ID == "2").ToList() });
            user.Add(new USER { ID = "3", EMP_ID = "", NAME = "admin", PASSWORD = "admin@123", ROLE = "admin", APPROLE = numbers.Where(x => x.EMP_ID == "2").ToList() });
            user.Add(new USER { ID = "4", EMP_ID = "", NAME = "user1", PASSWORD = "user@123", ROLE = "user", APPROLE = numbers.Where(x => x.EMP_ID == "1").ToList() });
            return user;

        }
        public string Deletereceiveditem(int id)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_ITEMRECEIVED_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_ITEMID", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", "");
                cmd.Parameters.Add("P_TIMEOFRECEIVED", "");
                cmd.Parameters.Add("P_DATEOFRECEIVED", "");
                cmd.Parameters.Add("P_ITEM_TYPE", "");




                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();

            }
            return ret;
        }
        public string GetStock(getstock Report)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {


                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_REPORT", con);
                cmd.CommandType = CommandType.StoredProcedure;


                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("data_cursor1", OracleDbType.RefCursor).Direction = ParameterDirection.Output;




                cmd.Parameters.Add("P_CATEGORY", Report.CATEGORY);
                cmd.Parameters.Add("P_EMPLOYEE", "");
                cmd.Parameters.Add("P_EMPLOYEE_STATUS", "");
                cmd.Parameters.Add("P_SUBCATEGORY", Report.SUBCATEGORY == null ? null : Report.SUBCATEGORY);

                cmd.Parameters.Add("P_SUBCHILDCATEGORY", Report.SUBCHILDCATEGORY == null ? null : Report.SUBCHILDCATEGORY);
                cmd.Parameters.Add("P_DEPTID", "");

                cmd.Parameters.Add("P_YEARDATE", "");
                cmd.Parameters.Add("P_FROM_DATE", "");
                cmd.Parameters.Add("P_TO_DATE", "");

                cmd.Parameters.Add("CALLVAL", "1");
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                DataSet ds = new DataSet();

                da.Fill(ds);
                da.Dispose();
                cmd.Dispose();
                con.Close();
                ret = ds.Tables[0].Rows[0][0].ToString();

                // ret[0].Dghuser = ds.Tables[1].ToList<DGHUserRepository>();
            }
            return ret;
        }


        public List<Report> dghreport(Report Report)
        {

            List<Report> ret = new List<Report>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_REPORT", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("data_cursor1", OracleDbType.RefCursor).Direction = ParameterDirection.Output;




                cmd.Parameters.Add("P_CATEGORY", Report.CATEGORY);
                cmd.Parameters.Add("P_EMPLOYEE", Report.EMPLOYEE);
                cmd.Parameters.Add("P_EMPLOYEE_STATUS", Report.EMPLOYEE_STATUS);
                cmd.Parameters.Add("P_SUBCATEGORY", Report.SUBCATEGORY);
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", Report.SUBCHILDCATEGORY);
                cmd.Parameters.Add("P_DEPTID", Report.DEPTID == null ? DBNull.Value : (object)Report.DEPTID);

                cmd.Parameters.Add("P_YEARDATE", Report.YEARDATE);
                cmd.Parameters.Add("P_FROM_DATE", Report.FROM_DATE);
                cmd.Parameters.Add("P_TO_DATE", Report.TO_DATE);
                cmd.Parameters.Add("CALLVAL", "0");
                DataSet ds = new DataSet();


                da.Fill(ds);

                ret = ds.Tables[0].ToList<Report>();
                ret[0].Dghuser = ds.Tables[1].ToList<DGHUserRepository>();
            }
            return ret;

        }
        public List<Department> department()
        {
            List<Department> ret = new List<Department>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_DGHUSER", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                // cmd.Parameters.Add("data_cursor1", OracleDbType.RefCursor).Direction = ParameterDirection.Output;

                cmd.Parameters.Add("P_STATUS", "");
                cmd.Parameters.Add("CALLVAL", "1");

                DataSet ds = new DataSet();


                da.Fill(ds);

                ret = ds.Tables[0].ToList<Department>();

                //  ret[0].DEPARTMENTS = ds.Tables[1].ToList<Department>();
            }
            return ret;

        }
        public List<USER> dghemployee(string status)
        {
            List<USER> ret = new List<USER>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_DGHUSER", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
               // cmd.Parameters.Add("data_cursor1", OracleDbType.RefCursor).Direction = ParameterDirection.Output;

                cmd.Parameters.Add("P_STATUS", status);
                cmd.Parameters.Add("CALLVAL", "0");

                DataSet ds = new DataSet();


                da.Fill(ds);

                ret = ds.Tables[0].ToList<USER>();

              //  ret[0].DEPARTMENTS = ds.Tables[1].ToList<Department>();
            }
            return ret;

        }
        //contractitems 


        public List<ititems> getcontractitems(string contractid)
        {
            List<ititems> ret = new List<ititems>();


            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();

                OracleCommand cmd = new OracleCommand("STATIONARY_ITEM_ADDED_PROC", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_SUBCATEGORY", "");
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", "");
                cmd.Parameters.Add("P_QUANTITY", "");
                cmd.Parameters.Add("P_CONTRACTID", contractid);

                cmd.Parameters.Add("CALLVAL", "1");
                DataTable dt = new DataTable();
                da.Fill(dt);

                ret = dt.ToList<ititems>();


            }
            return ret;

        }


        public string deleteititem(string id)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_ITEM_ADDED_PROC", con);
                cmd.CommandType = CommandType.StoredProcedure;
                //    OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_SUBCATEGORY", "");
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", "");
                cmd.Parameters.Add("P_QUANTITY", "");
                cmd.Parameters.Add("P_CONTRACTID", id);

                cmd.Parameters.Add("CALLVAL", "2");
                cmd.ExecuteNonQuery();
                con.Close();
                ret = "Success";
            }
            return ret;

        }
        public string saveititem(List<ititems> ititems)
        {
            deleteititem(ititems[0].CONTRACTID);
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                foreach (var item in ititems)
                {
                    OracleCommand cmd = new OracleCommand("STATIONARY_ITEM_ADDED_PROC", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    //       OracleDataAdapter da = new OracleDataAdapter(cmd);
                    // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                    cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("P_ID", "");
                    cmd.Parameters.Add("P_CATEGORY", item.CATEGORY);
                    cmd.Parameters.Add("P_SUBCATEGORY", item.SUBCATEGORY);
                    cmd.Parameters.Add("P_SUBCHILDCATEGORY", item.SUBCHILDCATEGORY);
                    cmd.Parameters.Add("P_QUANTITY", item.QUANTITY);
                    cmd.Parameters.Add("P_CONTRACTID", ititems[0].CONTRACTID);

                    cmd.Parameters.Add("CALLVAL", "0");
                    cmd.ExecuteNonQuery();
                    ret = "Success";
                }
                con.Close();


            }
            return "";

        }
        //contract
        public string SaveContractform(Contract Contract)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_CONTRACT_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_CONTRACTID", "");
                cmd.Parameters.Add("P_CONTRACTNO", Contract.CONTRACTNO);
                cmd.Parameters.Add("P_VENDORNAME", Contract.VENDORNAME);
                cmd.Parameters.Add("P_STARTDATE", Contract.STARTDATE);
                cmd.Parameters.Add("P_ENDDATE", Contract.ENDDATE);

                cmd.Parameters.Add("CALLVAL", "0");
                // cmd.ExecuteNonQuery();
                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
                Contract.ORDERITEM[0].CONTRACTID = ret;
                saveititem(Contract.ORDERITEM);
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }

        public string UpdateContractform(Contract Contract)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_CONTRACT_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_CONTRACTID", Contract.CONTRACTID);
                cmd.Parameters.Add("P_CONTRACTNO", Contract.CONTRACTNO);
                cmd.Parameters.Add("P_VENDORNAME", Contract.VENDORNAME);
                cmd.Parameters.Add("P_STARTDATE", Contract.STARTDATE);
                cmd.Parameters.Add("P_ENDDATE", Contract.ENDDATE);

                cmd.Parameters.Add("CALLVAL", "4");
                // cmd.ExecuteNonQuery();
                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
                Contract.ORDERITEM[0].CONTRACTID = Contract.CONTRACTID;
                saveititem(Contract.ORDERITEM);
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }

        public string deleteContractform(string id)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_CONTRACT_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;

                cmd.Parameters.Add("P_CONTRACTID", id);
                cmd.Parameters.Add("P_CONTRACTNO", "");
                cmd.Parameters.Add("P_VENDORNAME", "");
                cmd.Parameters.Add("P_STARTDATE", "");
                cmd.Parameters.Add("P_ENDDATE", "");


                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;

        }

        public List<Contract> GetContractform()
        {
            List<Contract> ret = new List<Contract>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_CONTRACT_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_CONTRACTID", "");
                cmd.Parameters.Add("P_CONTRACTNO", "");
                cmd.Parameters.Add("P_VENDORNAME", "");
                cmd.Parameters.Add("P_STARTDATE", "");
                cmd.Parameters.Add("P_ENDDATE", "");


                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<Contract>();
            }
            return ret;
        }




        public List<Contract> getContractformId(string id)
        {
            List<Contract> ret = new List<Contract>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_CONTRACT_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_CONTRACTID", id);


                cmd.Parameters.Add("P_CONTRACTNO", "");
                cmd.Parameters.Add("P_VENDORNAME", "");
                cmd.Parameters.Add("P_STARTDATE", "");
                cmd.Parameters.Add("P_ENDDATE", "");


                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);





                ret = ds.ToList<Contract>();
                ret[0].ORDERITEM = getcontractitems(id);
            }
            return ret;

        }




        //device name
        public string SaveDevicename(devicename devicename)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_DEVICE_NAME_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_DEVICE_NAME", devicename.DEVICENAME);


                cmd.Parameters.Add("CALLVAL", "0");
                // cmd.ExecuteNonQuery();
                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }
        public string UpdateDevicename(devicename devicename)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_DEVICE_NAME_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;

                cmd.Parameters.Add("P_ID", devicename.ID);
                cmd.Parameters.Add("P_DEVICE_NAME", devicename.DEVICENAME);
                cmd.Parameters.Add("CALLVAL", "4");
                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
                //  cmd.ExecuteNonQuery();

                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }
        public string deleteDevicename(int id)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_DEVICE_NAME_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_DEVICE_NAME", "");

                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;

        }


        public List<devicename> GetDevicename()
        {
            List<devicename> ret = new List<devicename>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_DEVICE_NAME_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_DEVICE_NAME", "");
                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<devicename>();
            }
            return ret;
        }


        public List<devicename> getDevicenameId(int id)
        {
            List<devicename> ret = new List<devicename>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_DEVICE_NAME_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_DEVICE_NAME", "");
                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);





                ret = ds.ToList<devicename>();
            }
            return ret;

        }

        //user

        //dgh user
        public string SaveDghuser_Repository(DGHUserRepository DGHUserRepository)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_DGHUSER_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_CATEGORY", DGHUserRepository.CATEGORY);
                cmd.Parameters.Add("P_EMPLOYEE", DGHUserRepository.EMPLOYEE);
                cmd.Parameters.Add("P_DATE_OF_RECEIPT", DGHUserRepository.DATE_OF_RECEIPT);
                cmd.Parameters.Add("P_QUANTITY", DGHUserRepository.QUANTITY);
                cmd.Parameters.Add("P_DATE_OF_ISSUE", DGHUserRepository.DATE_OF_ISSUE);
                cmd.Parameters.Add("P_ISSUER", DGHUserRepository.ISSUER);
                cmd.Parameters.Add("P_REMARK", DGHUserRepository.REMARK);


                cmd.Parameters.Add("P_SUBCHILDCATEGORY", DGHUserRepository.SUBCHILDCATEGORY == null ? DBNull.Value : (object)DGHUserRepository.SUBCHILDCATEGORY);
                cmd.Parameters.Add("P_SUBCATEGORY", DGHUserRepository.SUBCATEGORY == null ? DBNull.Value : (object)DGHUserRepository.SUBCATEGORY);

                cmd.Parameters.Add("CALLVAL", "0");
                cmd.ExecuteNonQuery();
                ret = "Success";
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }
        public string UpdateDghuser_Repository(DGHUserRepository DGHUserRepository)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_DGHUSER_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", DGHUserRepository.ID);
                cmd.Parameters.Add("P_CATEGORY", DGHUserRepository.CATEGORY);
                cmd.Parameters.Add("P_EMPLOYEE", DGHUserRepository.EMPLOYEE);
                cmd.Parameters.Add("P_DATE_OF_RECEIPT", DGHUserRepository.DATE_OF_RECEIPT);
                cmd.Parameters.Add("P_QUANTITY", DGHUserRepository.QUANTITY);
                cmd.Parameters.Add("P_DATE_OF_ISSUE", DGHUserRepository.DATE_OF_ISSUE);
                cmd.Parameters.Add("P_ISSUER", DGHUserRepository.ISSUER);
                cmd.Parameters.Add("P_REMARK", DGHUserRepository.REMARK);
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", DGHUserRepository.SUBCHILDCATEGORY == null ? DBNull.Value : (object)DGHUserRepository.SUBCHILDCATEGORY);
                cmd.Parameters.Add("P_SUBCATEGORY", DGHUserRepository.SUBCATEGORY == null ? DBNull.Value : (object)DGHUserRepository.SUBCATEGORY);
                cmd.Parameters.Add("CALLVAL", "4");
                cmd.ExecuteNonQuery();
                ret = "Success";
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }

        public string deleteDghuser_Repository(int id)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_DGHUSER_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_EMPLOYEE", "");
                cmd.Parameters.Add("P_DATE_OF_RECEIPT", "");
                cmd.Parameters.Add("P_QUANTITY", "");
                cmd.Parameters.Add("P_DATE_OF_ISSUE", "");
                cmd.Parameters.Add("P_ISSUER", "");
                cmd.Parameters.Add("P_REMARK", "");
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", "");
                cmd.Parameters.Add("P_SUBCATEGORY", "");
                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;

        }
        public List<DGHUserRepository> GetDGHuser_Repository()
        {
            List<DGHUserRepository> ret = new List<DGHUserRepository>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_DGHUSER_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_EMPLOYEE", "");
                cmd.Parameters.Add("P_DATE_OF_RECEIPT", "");
                cmd.Parameters.Add("P_QUANTITY", "");
                cmd.Parameters.Add("P_DATE_OF_ISSUE", "");
                cmd.Parameters.Add("P_ISSUER", "");
                cmd.Parameters.Add("P_REMARK", "");
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", "");
                cmd.Parameters.Add("P_SUBCATEGORY", "");
                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<DGHUserRepository>();
            }
            return ret;
        }


        public List<DGHUserRepository> getDGHuser_RepositoryId(int id)
        {
            List<DGHUserRepository> ret = new List<DGHUserRepository>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_DGHUSER_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_EMPLOYEE", "");
                cmd.Parameters.Add("P_DATE_OF_RECEIPT", "");
                cmd.Parameters.Add("P_QUANTITY", "");
                cmd.Parameters.Add("P_DATE_OF_ISSUE", "");
                cmd.Parameters.Add("P_ISSUER", "");
                cmd.Parameters.Add("P_REMARK", "");
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", "");
                cmd.Parameters.Add("P_SUBCATEGORY", "");
                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);





                ret = ds.ToList<DGHUserRepository>();
            }
            return ret;

        }


        //print repository
        public string SavePrint_Repository(PrintRepository PrintRepository)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_PRINT_REP_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_CATEGORY", PrintRepository.CATEGORY);
                cmd.Parameters.Add("P_BRAND", PrintRepository.BRAND);
                cmd.Parameters.Add("P_ANNUAL_REQUIREMENT", PrintRepository.ANNUAL_REQUIREMENT);
                cmd.Parameters.Add("P_UNIT", PrintRepository.UNIT);
                cmd.Parameters.Add("P_RATE", PrintRepository.RATE);
                cmd.Parameters.Add("P_GST_RATE", PrintRepository.GST_RATE);
                cmd.Parameters.Add("P_GST_AMOUNT", PrintRepository.GST_AMOUNT);
                cmd.Parameters.Add("P_TOTAL_ITEM_ORDER", PrintRepository.TOTAL_ITEM_ORDER);
                cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", PrintRepository.TOTAL_ITEM_RECEIVED);
                cmd.Parameters.Add("P_DATEOFRECEIVED", PrintRepository.DATEOFRECEIVED);
                cmd.Parameters.Add("P_DATEOFORDER", PrintRepository.DATEOFORDER);
                cmd.Parameters.Add("P_SUBCATEGORY", PrintRepository.SUBCATEGORY == null ? DBNull.Value : (object)PrintRepository.SUBCATEGORY);
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", PrintRepository.SUBCHILDCATEGORY == null ? DBNull.Value : (object)PrintRepository.SUBCHILDCATEGORY);
                cmd.Parameters.Add("P_TIMEOFORDER", PrintRepository.TIMEOFORDER);
                cmd.Parameters.Add("P_TIMEOFRECEIVED", PrintRepository.TIMEOFRECEIVED);
                cmd.Parameters.Add("CALLVAL", "0");

                DataTable ds = new DataTable();


                da.Fill(ds);
                ret = ds.Rows[0][0].ToString();
                if (ret != null || ret != "")
                {
                    ret = addstationarymultiitem(PrintRepository.ORDERRECEIVED, ret, "Print");
                }

            }
            return ret;
        }


        public string UpdatePrint_Repository(PrintRepository PrintRepository)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_PRINT_REP_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", PrintRepository.ID);
                cmd.Parameters.Add("P_CATEGORY", PrintRepository.CATEGORY);
                cmd.Parameters.Add("P_BRAND", PrintRepository.BRAND);
                cmd.Parameters.Add("P_ANNUAL_REQUIREMENT", PrintRepository.ANNUAL_REQUIREMENT);
                cmd.Parameters.Add("P_UNIT", PrintRepository.UNIT);
                cmd.Parameters.Add("P_RATE", PrintRepository.RATE);
                cmd.Parameters.Add("P_GST_RATE", PrintRepository.GST_RATE);
                cmd.Parameters.Add("P_GST_AMOUNT", PrintRepository.GST_AMOUNT);
                cmd.Parameters.Add("P_TOTAL_ITEM_ORDER", PrintRepository.TOTAL_ITEM_ORDER);
                cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", PrintRepository.TOTAL_ITEM_RECEIVED);
                cmd.Parameters.Add("P_DATEOFRECEIVED", PrintRepository.DATEOFRECEIVED);
                cmd.Parameters.Add("P_DATEOFORDER", PrintRepository.DATEOFORDER);
                cmd.Parameters.Add("P_SUBCATEGORY", PrintRepository.SUBCATEGORY == null ? DBNull.Value : (object)PrintRepository.SUBCATEGORY);
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", PrintRepository.SUBCHILDCATEGORY == null ? DBNull.Value : (object)PrintRepository.SUBCHILDCATEGORY);
                cmd.Parameters.Add("P_TIMEOFORDER", PrintRepository.TIMEOFORDER);
                cmd.Parameters.Add("P_TIMEOFRECEIVED", PrintRepository.TIMEOFRECEIVED);
                cmd.Parameters.Add("CALLVAL", "4");
                cmd.ExecuteNonQuery();
                ret = "Success";
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();
                if (ret != null || ret != "")
                {
                    ret = addstationarymultiitem(PrintRepository.ORDERRECEIVED, PrintRepository.ID.ToString(), "Print");
                }
            }
            return ret;
        }

        public string deletePrint_Repository(int id)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_PRINT_REP_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_BRAND", "");
                cmd.Parameters.Add("P_ANNUAL_REQUIREMENT", "");
                cmd.Parameters.Add("P_UNIT", "");
                cmd.Parameters.Add("P_RATE", "");
                cmd.Parameters.Add("P_GST_RATE", "");
                cmd.Parameters.Add("P_GST_AMOUNT", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_ORDER", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", "");
                cmd.Parameters.Add("P_DATEOFRECEIVED", "");
                cmd.Parameters.Add("P_DATEOFORDER", "");
                cmd.Parameters.Add("P_SUBCATEGORY", "");
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", "");
                cmd.Parameters.Add("P_TIMEOFORDER", "");
                cmd.Parameters.Add("P_TIMEOFRECEIVED", "");
                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;

        }
        public List<PrintRepository> GetPrint_Repository()
        {
            List<PrintRepository> ret = new List<PrintRepository>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_PRINT_REP_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_BRAND", "");
                cmd.Parameters.Add("P_ANNUAL_REQUIREMENT", "");
                cmd.Parameters.Add("P_UNIT", "");
                cmd.Parameters.Add("P_RATE", "");
                cmd.Parameters.Add("P_GST_RATE", "");
                cmd.Parameters.Add("P_GST_AMOUNT", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_ORDER", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", "");
                cmd.Parameters.Add("P_DATEOFRECEIVED", "");
                cmd.Parameters.Add("P_DATEOFORDER", "");
                cmd.Parameters.Add("P_SUBCATEGORY", "");
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", "");
                cmd.Parameters.Add("P_TIMEOFORDER", "");
                cmd.Parameters.Add("P_TIMEOFRECEIVED", "");
                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<PrintRepository>();
            }
            return ret;
        }

        public List<PrintRepository> getPrint_RepositoryId(int id)
        {
            List<PrintRepository> ret = new List<PrintRepository>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_PRINT_REP_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_BRAND", "");
                cmd.Parameters.Add("P_ANNUAL_REQUIREMENT", "");
                cmd.Parameters.Add("P_UNIT", "");
                cmd.Parameters.Add("P_RATE", "");
                cmd.Parameters.Add("P_GST_RATE", "");
                cmd.Parameters.Add("P_GST_AMOUNT", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_ORDER", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", "");
                cmd.Parameters.Add("P_DATEOFRECEIVED", "");
                cmd.Parameters.Add("P_DATEOFORDER", "");
                cmd.Parameters.Add("P_SUBCATEGORY", "");
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", "");
                cmd.Parameters.Add("P_TIMEOFORDER", "");
                cmd.Parameters.Add("P_TIMEOFRECEIVED", "");
                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);





                ret = ds.ToList<PrintRepository>();
                ret[0].ORDERRECEIVED = getorderitemlist(id, "Print");
            }
            return ret;

        }

        //stationary repository
        public string SaveStationary_Repository(StationaryRepository StationaryRepository)
        {


            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_REPOSITORY_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_CATEGORY", StationaryRepository.CATEGORY);
                cmd.Parameters.Add("P_COMPANY", StationaryRepository.COMPANY);
                cmd.Parameters.Add("P_ESTIMATED_QUANTITY", StationaryRepository.ESTIMATED_QUANTITY);
                cmd.Parameters.Add("P_UNIT", StationaryRepository.UNIT);
                cmd.Parameters.Add("P_BASIC_AMOUNT", StationaryRepository.BASIC_AMOUNT);
                cmd.Parameters.Add("P_GST", StationaryRepository.GST);
                cmd.Parameters.Add("P_TOTAL_ITEM_ORDER", StationaryRepository.TOTAL_ITEM_ORDER);
                cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", StationaryRepository.TOTAL_ITEM_RECEIVED);
                cmd.Parameters.Add("P_DATEOFRECEIVED", StationaryRepository.DATEOFRECEIVED);
                cmd.Parameters.Add("P_DATEOFORDER", StationaryRepository.DATEOFORDER);
                cmd.Parameters.Add("P_SUBCATEGORY", StationaryRepository.SUBCATEGORY == null ? DBNull.Value : (object)StationaryRepository.SUBCATEGORY);
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", StationaryRepository.SUBCHILDCATEGORY == null ? DBNull.Value : (object)StationaryRepository.SUBCHILDCATEGORY);
                cmd.Parameters.Add("P_TIMEOFORDER", StationaryRepository.TIMEOFORDER);
                cmd.Parameters.Add("P_TIMEOFRECEIVED", StationaryRepository.TIMEOFRECEIVED);

                cmd.Parameters.Add("CALLVAL", "0");

                DataTable ds = new DataTable();


                da.Fill(ds);
                ret = ds.Rows[0][0].ToString();
                if (ret != null || ret != "")
                {
                    ret = addstationarymultiitem(StationaryRepository.ORDERRECEIVED, ret, "Stationary");
                }
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();


            }

            return ret;
        }

        public void updatestatusreceiveditem(string ret1, string type)
        {

            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();


                OracleCommand cmd = new OracleCommand("STATIONARY_ITEMRECEIVED_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_ITEMID", ret1);
                cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", "");
                cmd.Parameters.Add("P_TIMEOFRECEIVED", "");
                cmd.Parameters.Add("P_DATEOFRECEIVED", "");
                cmd.Parameters.Add("P_ITEM_TYPE", type);



                cmd.Parameters.Add("CALLVAL", "3");
                cmd.ExecuteNonQuery();


                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();


            }
        }

        public string addstationarymultiitem(List<orderreceived> items, string ret1, string type)
        {
            updatestatusreceiveditem(ret1, type);
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                foreach (var item in items)
                {

                    OracleCommand cmd = new OracleCommand("STATIONARY_ITEMRECEIVED_CRUD", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    OracleDataAdapter da = new OracleDataAdapter(cmd);
                    // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                    cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("P_ID", "");
                    cmd.Parameters.Add("P_ITEMID", ret1);
                    cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", item.TOTAL_ITEM_RECEIVED);
                    cmd.Parameters.Add("P_TIMEOFRECEIVED", item.TIMEOFRECEIVED);
                    cmd.Parameters.Add("P_DATEOFRECEIVED", item.DATEOFRECEIVED);
                    cmd.Parameters.Add("P_ITEM_TYPE", type);



                    cmd.Parameters.Add("CALLVAL", "0");
                    cmd.ExecuteNonQuery();
                    ret = "Success";

                    //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();


                }
                con.Close();
            }
            return ret;
        }


        public List<orderreceived> getorderitemlist(int id, string type)
        {
            List<orderreceived> ret = new List<orderreceived>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();


                OracleCommand cmd = new OracleCommand("STATIONARY_ITEMRECEIVED_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_ITEMID", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", "");
                cmd.Parameters.Add("P_TIMEOFRECEIVED", "");
                cmd.Parameters.Add("P_DATEOFRECEIVED", "");
                cmd.Parameters.Add("P_ITEM_TYPE", type);

                cmd.Parameters.Add("CALLVAL", "1");
                DataTable ds = new DataTable();


                da.Fill(ds);
                ret = ds.ToList<orderreceived>();

            }

            return ret;
        }

        public string UpdateStationary_Repository(StationaryRepository StationaryRepository)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_REPOSITORY_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", StationaryRepository.ID);
                cmd.Parameters.Add("P_CATEGORY", StationaryRepository.CATEGORY);
                cmd.Parameters.Add("P_COMPANY", StationaryRepository.COMPANY);
                cmd.Parameters.Add("P_ESTIMATED_QUANTITY", StationaryRepository.ESTIMATED_QUANTITY);
                cmd.Parameters.Add("P_UNIT", StationaryRepository.UNIT);
                cmd.Parameters.Add("P_BASIC_AMOUNT", StationaryRepository.BASIC_AMOUNT);

                cmd.Parameters.Add("P_GST", StationaryRepository.GST);
                cmd.Parameters.Add("P_TOTAL_ITEM_ORDER", StationaryRepository.TOTAL_ITEM_ORDER);
                cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", StationaryRepository.TOTAL_ITEM_RECEIVED);
                cmd.Parameters.Add("P_DATEOFRECEIVED", StationaryRepository.DATEOFRECEIVED);
                cmd.Parameters.Add("P_DATEOFORDER", StationaryRepository.DATEOFORDER);
                cmd.Parameters.Add("P_SUBCATEGORY", StationaryRepository.SUBCATEGORY == null ? DBNull.Value : (object)StationaryRepository.SUBCATEGORY);
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", StationaryRepository.SUBCHILDCATEGORY == null ? DBNull.Value : (object)StationaryRepository.SUBCHILDCATEGORY);
                cmd.Parameters.Add("P_TIMEOFORDER", StationaryRepository.TIMEOFORDER);
                cmd.Parameters.Add("P_TIMEOFRECEIVED", StationaryRepository.TIMEOFRECEIVED);
                cmd.Parameters.Add("CALLVAL", "4");
                cmd.ExecuteNonQuery();
                ret = "Success";
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();
                if (ret != null || ret != "")
                {
                    ret = addstationarymultiitem(StationaryRepository.ORDERRECEIVED, Convert.ToString(StationaryRepository.ID), "Stationary");
                }
            }
            return ret;
        }

        public string deleteStationary_Repository(int id)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_REPOSITORY_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);

                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_COMPANY", "");
                cmd.Parameters.Add("P_ESTIMATED_QUANTITY", "");
                cmd.Parameters.Add("P_UNIT", "");
                cmd.Parameters.Add("P_BASIC_AMOUNT", "");

                cmd.Parameters.Add("P_GST", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_ORDER", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", "");
                cmd.Parameters.Add("P_DATEOFRECEIVED", "");
                cmd.Parameters.Add("P_DATEOFORDER", "");
                cmd.Parameters.Add("P_SUBCATEGORY", "");
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", "");
                cmd.Parameters.Add("P_TIMEOFORDER", "");
                cmd.Parameters.Add("P_TIMEOFRECEIVED", "");
                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;

        }
        public List<StationaryRepository> GetStationary_Repository()
        {
            List<StationaryRepository> ret = new List<StationaryRepository>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_REPOSITORY_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_COMPANY", "");
                cmd.Parameters.Add("P_ESTIMATED_QUANTITY", "");
                cmd.Parameters.Add("P_UNIT", "");
                cmd.Parameters.Add("P_BASIC_AMOUNT", "");

                cmd.Parameters.Add("P_GST", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_ORDER", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", "");
                cmd.Parameters.Add("P_DATEOFRECEIVED", "");
                cmd.Parameters.Add("P_DATEOFORDER", "");
                cmd.Parameters.Add("P_SUBCATEGORY", "");
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", "");
                cmd.Parameters.Add("P_TIMEOFORDER", "");
                cmd.Parameters.Add("P_TIMEOFRECEIVED", "");
                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<StationaryRepository>();
            }
            return ret;
        }

        public List<StationaryRepository> getStationary_RepositoryId(int id)
        {


            List<StationaryRepository> ret = new List<StationaryRepository>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_REPOSITORY_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_COMPANY", "");
                cmd.Parameters.Add("P_ESTIMATED_QUANTITY", "");
                cmd.Parameters.Add("P_UNIT", "");
                cmd.Parameters.Add("P_BASIC_AMOUNT", "");

                cmd.Parameters.Add("P_GST", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_ORDER", "");
                cmd.Parameters.Add("P_TOTAL_ITEM_RECEIVED", "");
                cmd.Parameters.Add("P_DATEOFRECEIVED", "");
                cmd.Parameters.Add("P_DATEOFORDER", "");
                cmd.Parameters.Add("P_SUBCATEGORY", "");
                cmd.Parameters.Add("P_SUBCHILDCATEGORY", "");
                cmd.Parameters.Add("P_TIMEOFORDER", "");
                cmd.Parameters.Add("P_TIMEOFRECEIVED", "");
                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);





                ret = ds.ToList<StationaryRepository>();
                ret[0].ORDERRECEIVED = getorderitemlist(id, "Stationary");
            }
            return ret;

        }
        public List<SubCategory> GetCategoryDropdown(string category, string categorytype)
        {
            List<SubCategory> ret = new List<SubCategory>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_SUBCATEGORY", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_DESCRIPTION", "");
                cmd.Parameters.Add("P_PARENTID", "");
                cmd.Parameters.Add("P_CATEGORY", category);
                cmd.Parameters.Add("P_CATEGORYTYPE", categorytype);
                cmd.Parameters.Add("CALLVAL", "5");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<SubCategory>();
            }
            return ret;
        }
        public string SaveSubcategory(SubCategory SubCategory)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_SUBCATEGORY", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_DESCRIPTION", SubCategory.DESCRIPTION);
                cmd.Parameters.Add("P_PARENTID", SubCategory.PARENT_ID);
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_CATEGORYTYPE", SubCategory.CATEGORYTYPE);
                cmd.Parameters.Add("CALLVAL", "0");
                cmd.ExecuteNonQuery();
                ret = "Success";
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }

        public string UpdateSubcategory(SubCategory SubCategory)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_SUBCATEGORY", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", SubCategory.ID);
                cmd.Parameters.Add("P_DESCRIPTION", SubCategory.DESCRIPTION);
                cmd.Parameters.Add("P_PARENTID", SubCategory.PARENT_ID);
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_CATEGORYTYPE", SubCategory.CATEGORYTYPE);
                cmd.Parameters.Add("CALLVAL", "4");
                cmd.ExecuteNonQuery();
                ret = "Success";
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }

        public string deleteSubcategory(int id)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_SUBCATEGORY", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);

                cmd.Parameters.Add("P_DESCRIPTION", "");
                cmd.Parameters.Add("P_PARENTID", "");
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_CATEGORYTYPE", "");
                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;

        }

        public List<SubCategory> GetSubcategory(string category, string categorytype)
        {
            List<SubCategory> ret = new List<SubCategory>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_SUBCATEGORY", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_DESCRIPTION", "");
                cmd.Parameters.Add("P_PARENTID", "");
                cmd.Parameters.Add("P_CATEGORY", category);
                cmd.Parameters.Add("P_CATEGORYTYPE", categorytype);
                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<SubCategory>();
            }
            return ret;
        }

        public List<SubCategory> getSubcategoryId(int id)
        {
            List<SubCategory> ret = new List<SubCategory>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_SUBCATEGORY", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_DESCRIPTION", "");
                cmd.Parameters.Add("P_PARENTID", "");
                cmd.Parameters.Add("P_CATEGORY", "");
                cmd.Parameters.Add("P_CATEGORYTYPE", "");
                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);





                ret = ds.ToList<SubCategory>();
            }
            return ret;

        }
        //company
        public List<Company> GetCompany()
        {
            List<Company> ret = new List<Company>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARYITEMCOMAPANYCRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_COMPANYNAME", "");

                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<Company>();
            }
            return ret;
        }
        public List<Company> getcompanyId(int id)
        {
            List<Company> ret = new List<Company>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARYITEMCOMAPANYCRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_COMPANYNAME", "");

                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);





                ret = ds.ToList<Company>();
            }
            return ret;

        }

        public string SaveCompany(Company company)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARYITEMCOMAPANYCRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_COMPANYNAME", company.COMPANYNAME);

                cmd.Parameters.Add("CALLVAL", "0");
                cmd.ExecuteNonQuery();
                ret = "Success";
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }


        public string Updatecompany(Company company)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARYITEMCOMAPANYCRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", company.ID);
                cmd.Parameters.Add("P_COMPANYNAME", company.COMPANYNAME);

                cmd.Parameters.Add("CALLVAL", "4");
                cmd.ExecuteNonQuery();
                ret = "Success";
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }
        public string deletecompany(int id)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARYITEMCOMAPANYCRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_UNITS_DESCRIPTION", "");

                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;

        }

        //units

        public string SaveUnits(Units Units)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_UNITS_TABLE", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_UNITS_DESCRIPTION", Units.UNITS_DESCRIPTION);

                cmd.Parameters.Add("CALLVAL", "0");
                cmd.ExecuteNonQuery();
                ret = "Success";
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }



        public string Updateunits(Units Units)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_UNITS_TABLE", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", Units.ID);
                cmd.Parameters.Add("P_UNITS_DESCRIPTION", Units.UNITS_DESCRIPTION);

                cmd.Parameters.Add("CALLVAL", "4");
                cmd.ExecuteNonQuery();
                ret = "Success";
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }

        public string deleteunits(int id)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_UNITS_TABLE", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_UNITS_DESCRIPTION", "");

                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;

        }



        public List<Units> GetUnits()
        {
            List<Units> ret = new List<Units>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_UNITS_TABLE", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_UNITS_DESCRIPTION", "");

                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<Units>();
            }
            return ret;
        }

        public List<Units> getunitsId(int id)
        {
            List<Units> ret = new List<Units>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_UNITS_TABLE", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_UNITS_DESCRIPTION", "");

                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);





                ret = ds.ToList<Units>();
            }
            return ret;

        }


        //material
        public string MaterialSave(Material Material)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_MATERITEMS", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_ITEMS_DESCRIPTION", Material.ITEMS_DESCRIPTION);
                cmd.Parameters.Add("P_TYPE", Material.TYPE);
                cmd.Parameters.Add("P_APP_TYPE", Material.APPTYPE);
                cmd.Parameters.Add("CALLVAL", "0");
                cmd.ExecuteNonQuery();
                ret = "Success";
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }

        public string MaterialUpdate(Material Material)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_MATERITEMS", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", Material.ID);
                cmd.Parameters.Add("P_ITEMS_DESCRIPTION", Material.ITEMS_DESCRIPTION);
                cmd.Parameters.Add("P_TYPE", Material.TYPE);
                cmd.Parameters.Add("P_APP_TYPE", "");
                cmd.Parameters.Add("CALLVAL", "4");
                cmd.ExecuteNonQuery();
                ret = "Success";
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }
        public string deleteMaterial(int id)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_MATERITEMS", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_ITEMS_DESCRIPTION", "");
                cmd.Parameters.Add("P_TYPE", "");
                cmd.Parameters.Add("P_APP_TYPE", "");
                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;

        }
        public List<SubCategory> Getsubcategoryonchange(string materialtype)
        {
            List<SubCategory> ret = new List<SubCategory>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_SUBCATEGORY", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;

                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_DESCRIPTION", "");
                cmd.Parameters.Add("P_PARENTID", materialtype);
                cmd.Parameters.Add("P_CATEGORY", materialtype);
                cmd.Parameters.Add("P_CATEGORYTYPE", materialtype);

                cmd.Parameters.Add("CALLVAL", "6");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<SubCategory>();
            }
            return ret;
        }

        public List<listofdropdown> GetMaterialforstaOrprint(string materialtype)
        {
            List<listofdropdown> ret = new List<listofdropdown>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_MATERIAL_COMPANY", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("data_cursor1", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("data_cursor2", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("data_cursor3", OracleDbType.RefCursor).Direction = ParameterDirection.Output;

                cmd.Parameters.Add("P_TYPE", materialtype);
                cmd.Parameters.Add("CALLVAL", "0");

                DataSet ds = new DataSet();


                da.Fill(ds);
                ret = ds.Tables[3].ToList<listofdropdown>();
                ret[0].Material = ds.Tables[0].ToList<Material>();
                ret[0].Company = ds.Tables[1].ToList<Company>();
                ret[0].Unit = ds.Tables[2].ToList<Units>();
            }
            return ret;
        }
        public List<Material> GetMaterial(string status)
        {
            List<Material> ret = new List<Material>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_MATERITEMS", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_ITEMS_DESCRIPTION", "");
                cmd.Parameters.Add("P_TYPE", "");
                cmd.Parameters.Add("P_APP_TYPE", status);
                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<Material>();
            }
            return ret;
        }

        public List<Material> GetmaterialID(int id)
        {
            List<Material> ret = new List<Material>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_MATERITEMS", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_ITEMS_DESCRIPTION", "");
                cmd.Parameters.Add("P_TYPE", "");
                cmd.Parameters.Add("P_APP_TYPE", "");
                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);





                ret = ds.ToList<Material>();
            }
            return ret;

        }



        public IList<StateTable> StateData()
        {
            List<StateTable> ret = new List<StateTable>();

            try
            {
                var dd = "";
                using (OracleConnection con = new OracleConnection(connection))
                {
                    con.Open();
                    OracleCommand cmd = new OracleCommand("POMS_FRM_GET_STATES", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    OracleDataAdapter da = new OracleDataAdapter(cmd);
                    cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                    DataTable dt = new DataTable();


                    da.Fill(dt);

                    ret = dt.ToList<StateTable>();

                    con.Close();
                }
            }
            catch (Exception e)
            {
                // ErrorHandlingLogSave(e.Message, "StateData");
            }
            return ret;
        }
        public List<PMLGerenaldata> PMLDashboard()
        {
            List<PMLGerenaldata> ret = new List<PMLGerenaldata>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("POMS_PML_PEL_NODAL_DATA", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("data_cursor1", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("data_cursor2", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_USER_ID2", "e3fa56d1e8e9483a810585bc68cf1ebd");
                DataSet ds = new DataSet();


                da.Fill(ds);

                ret = ds.Tables[0].ToList<PMLGerenaldata>();
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }
        public List<USER> GetProfilebyid(int id)
        {
            List<USER> ret = new List<USER>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("PROC_TBL_TEST_USER", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_NAME", "");
                cmd.Parameters.Add("P_ADDRESS", "");
                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<USER>();
            }
            return ret;

        }

        public string deleteProfileId(int id)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("PROC_TBL_TEST_USER", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_NAME", "");
                cmd.Parameters.Add("P_ADDRESS", "");
                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;

        }
        public List<USER> GetProfile()
        {
            List<USER> ret = new List<USER>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("PROC_TBL_TEST_USER", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_NAME", "");
                cmd.Parameters.Add("P_ADDRESS", "");
                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<USER>();
            }
            return ret;

        }
        public string UserProfileSave(USER user)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("PROC_TBL_TEST_USER", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", user.NAME);
                cmd.Parameters.Add("P_NAME", user.NAME);
                cmd.Parameters.Add("P_ADDRESS", user.ADDRESS);
                cmd.Parameters.Add("CALLVAL", "0");
                cmd.ExecuteNonQuery();
                ret = "Success";
                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }
        public List<ApplicationRole> GetRoles()
        {
            List<ApplicationRole> ret = new List<ApplicationRole>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_ROLE_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_NAME", "");
                cmd.Parameters.Add("P_DESCRIPTION", "");


                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<ApplicationRole>();
            }
            return ret;
        }

        public bool checkroleuser(string userid,string rolename)
        {
            
            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_USER_ROLE_INSERT", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_USERID", userid);
                cmd.Parameters.Add("P_ROLEID", rolename);

                cmd.Parameters.Add("CALLVAL", "6");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
              
            }

            return ret=="false"?false :true;
           
        }

        public string checkusercandelete(string id)
        {

            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_USERDGH_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);
                cmd.Parameters.Add("P_USERNAME", "");
                cmd.Parameters.Add("P_EMAILID", "");
                cmd.Parameters.Add("P_PHONENO", "");
                cmd.Parameters.Add("P_DEPTID", "");
                cmd.Parameters.Add("P_PASSWORD", "");

                
                cmd.Parameters.Add("CALLVAL", "9");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();

            }

            return ret;

        }

        public string checkrolecandelete(string id)
        {

            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_USER_ROLE_INSERT", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_USERID", "");
                cmd.Parameters.Add("P_ROLEID", id);

                cmd.Parameters.Add("CALLVAL", "4");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();

            }

            return ret;

        }

        public List<string> Getrolebyuser(string userid)
        {
            List<string> ret = new List<string>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_USER_ROLE_INSERT", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_USERID", userid);
                cmd.Parameters.Add("P_ROLEID", "");

                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                foreach (DataRow row in ds.Rows)
                {
                    ret.Add(row["Roles"].ToString());
                }
            }
            return ret;
        }

        public List<UserIDROLEID> Getrolealluser()
        {
            List<UserIDROLEID> ret = new List<UserIDROLEID>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_USER_ROLE_INSERT", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_USERID", "");
                cmd.Parameters.Add("P_ROLEID", "");

                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);
                ret = ds.ToList<UserIDROLEID>();
                //foreach (DataRow row in ds.Rows)
                //{
                //    ret.Add(row["Roles"].ToString());
                //}
            }
            return ret;
        }
        public List<ClaimViewModel> getclaimbyrole(string roleid)
        {


            List<ClaimViewModel> ret = new List<ClaimViewModel>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STTAIONARY_ROLE_PERMISSION", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ROLEID", roleid);
                cmd.Parameters.Add("P_CLAIMTYPE", "");
                cmd.Parameters.Add("P_CLAIMVALUE", "");

                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<ClaimViewModel>();
            }
            return ret;
        }

        public string Addclaimbyrole(string roleid, string claimtype, string claimvalue)
        {


            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STTAIONARY_ROLE_PERMISSION", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ROLEID", roleid);
                cmd.Parameters.Add("P_CLAIMTYPE", claimtype);
                cmd.Parameters.Add("P_CLAIMVALUE", claimvalue);

                cmd.Parameters.Add("CALLVAL", "0");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;
        }

        public string removeclaimbyrole(string roleid, string claimtype, string claimvalue)
        {


            string ret = "";
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STTAIONARY_ROLE_PERMISSION", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ROLEID", roleid);
                cmd.Parameters.Add("P_CLAIMTYPE", claimtype);
                cmd.Parameters.Add("P_CLAIMVALUE", claimvalue);

                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;
        }
        public List<ApplicationUser> GetUsers()
        {
            List<ApplicationUser> ret = new List<ApplicationUser>();
            using (OracleConnection con = new OracleConnection(connection))
            {

                con.Open();
                OracleCommand cmd = new OracleCommand("STATIONARY_USERDGH_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_USERNAME", "");
                cmd.Parameters.Add("P_EMAILID", "");
                cmd.Parameters.Add("P_PHONENO", "");
                cmd.Parameters.Add("P_DEPTID", "");
                cmd.Parameters.Add("P_PASSWORD", "");

                cmd.Parameters.Add("CALLVAL", "1");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.ToList<ApplicationUser>();
            }
            return ret;
        }

      
    }
}

public static class Extensions
{
    public static List<T> ToList<T>(this DataTable table) where T : new()
    {
        IList<PropertyInfo> properties = typeof(T).GetProperties().ToList();
        List<T> result = new List<T>();

        foreach (var row in table.Rows)
        {
            var item = CreateItemFromRow<T>((DataRow)row, properties);
            result.Add(item);
        }

        return result;
    }

    private static T CreateItemFromRow<T>(DataRow row, IList<PropertyInfo> properties) where T : new()
    {
        T item = new T();
        foreach (var property in properties)
        {
            if (row.Table.Columns.Contains(property.Name))
            {
                if (row[property.Name] != System.DBNull.Value)
                {
                    if (property.PropertyType == typeof(System.String))
                        property.SetValue(item, Convert.ToString(row[property.Name]), null);
                    else if (property.PropertyType == typeof(System.Int32))
                        property.SetValue(item, Convert.ToInt32(row[property.Name]), null);
                    else if (property.PropertyType == typeof(System.DayOfWeek))
                    {
                        DayOfWeek day = (DayOfWeek)Enum.Parse(typeof(DayOfWeek), row[property.Name].ToString());
                        property.SetValue(item, day, null);
                    }
                    else
                        property.SetValue(item, row[property.Name], null);
                }
            }
        }
        return item;
    }





}




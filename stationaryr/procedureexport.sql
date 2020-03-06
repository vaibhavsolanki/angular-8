--------------------------------------------------------
--  File created - Friday-March-06-2020   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Procedure STATIONARY_CONTRACT_CRUD
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_CONTRACT_CRUD" (

DATA_CURSOR out SYS_REFCURSOR,
P_CONTRACTID VARCHAR2 DEFAULT null,
P_CONTRACTNO VARCHAR2 DEFAULT null,
P_VENDORNAME VARCHAR2  DEFAULT null,
P_STARTDATE date DEFAULT null,
P_ENDDATE date DEFAULT null,
CALLVAL VARCHAR2
)AS 
contractidvalue varchar(250);
BEGIN
  if(CALLVAL='0') then
  select 'C'||To_char(sysdate,'YYMMDDHHMMSS') into contractidvalue from dual;
 insert into STATIONARY_CONTRACTFORM(contractno,vendorname,startdate,enddate,status,CREATED_DATE,contractid)VALUES(P_CONTRACTNO,P_VENDORNAME,P_STARTDATE,P_ENDDATE,'1',sysdate,contractidvalue);
 OPEN DATA_CURSOR FOR SELECT contractidvalue as id FROM DUAL;
  end if;
  
  IF(CALLVAL ='1')  THEN



OPEN DATA_CURSOR FOR SELECT ID,CONTRACTID,CONTRACTNO,(select vendorname from stationary_it_vendor_details where id=cast(sc.VENDORNAME as int ))as VENDORNAME,STARTDATE,ENDDATE,CONTRACTID from STATIONARY_CONTRACTFORM sc where status=1 order by id desc;

END IF;
IF(CALLVAL ='2')  THEN



OPEN DATA_CURSOR FOR SELECT ID,CONTRACTID,CONTRACTNO,VENDORNAME,STARTDATE,ENDDATE from STATIONARY_CONTRACTFORM where CONTRACTID=P_CONTRACTID and status=1 ;

END IF;
IF(CALLVAL ='3')  THEN
update STATIONARY_CONTRACTFORM set status='0' where CONTRACTID=P_CONTRACTID;
 OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;

end if;
IF(CALLVAL ='4')  THEN

update STATIONARY_CONTRACTFORM set CONTRACTNO=P_CONTRACTNO,VENDORNAME=P_VENDORNAME,STARTDATE=P_STARTDATE,ENDDATE=P_ENDDATE  where CONTRACTID=P_CONTRACTID;
 OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;

end if;
END STATIONARY_CONTRACT_CRUD;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_DEVICE_NAME_CRUD
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_DEVICE_NAME_CRUD" 
(
DATA_CURSOR out SYS_REFCURSOR,
P_ID VARCHAR2 DEFAULT null,
P_DEVICE_NAME VARCHAR2 DEFAULT null,

CALLVAL VARCHAR2)
AS 
BEGIN
  IF(CALLVAL ='0')  THEN
 insert into STATIONARY_DEVICE_NAME(devicename,status,created_date)values(P_DEVICE_NAME,'1',sysdate);
 OPEN DATA_CURSOR FOR SELECT 'success' from dual ;
  end if;
  
  IF(CALLVAL ='1')  THEN



OPEN DATA_CURSOR FOR SELECT ID,DEVICENAME,CREATED_DATE,STATUS from STATIONARY_DEVICE_NAME where status=1;

END IF;
IF(CALLVAL ='2')  THEN



OPEN DATA_CURSOR FOR SELECT ID,DEVICENAME,CREATED_DATE,STATUS from STATIONARY_DEVICE_NAME where ID=P_ID and status=1 ;

END IF;

IF(CALLVAL ='3')  THEN

update STATIONARY_DEVICE_NAME set status='1' where ID=P_ID;


OPEN DATA_CURSOR FOR SELECT 'success' from dual ;

END IF;
 IF(CALLVAL ='4')  THEN

update STATIONARY_DEVICE_NAME set DEVICENAME=P_DEVICE_NAME where ID=P_ID;


OPEN DATA_CURSOR FOR SELECT 'success' from dual ;

END IF;
END STATIONARY_DEVICE_NAME_CRUD;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_DGHUSER
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_DGHUSER" 
(
DATA_CURSOR out SYS_REFCURSOR,
DATA_CURSOR1 out SYS_REFCURSOR,
P_STATUS varchar2,
CALLVAL VARCHAR2)AS 

BEGIN
if(CALLVAL='0') then

  open DATA_CURSOR for  SELECT
    emp_id as EMP_ID,
    name||' ('||EMP_ID||')' as NAME
    FROM
    v_emp_master
     where status = CASE
              WHEN P_STATUS = 'Working' THEN  P_STATUS 
                WHEN P_STATUS = 'Separated' THEN  P_STATUS 
              ELSE status
           END
    union 
    select TO_CHAR(ID) as EMP_ID, username||' (ext)' as NAME from STATIONARY_USERSDGH where status =1 order by EMP_ID;
   
    end if;
     open DATA_CURSOR1 for  SELECT
     DEPT_ID as ID,DEPT_NAME as NAME  from POMS_DEPT_MASTER;
END STATIONARY_DGHUSER;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_DGHUSER_CRUD
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_DGHUSER_CRUD" (
DATA_CURSOR out SYS_REFCURSOR,
P_ID VARCHAR2 DEFAULT null,
P_CATEGORY VARCHAR2 DEFAULT null,
P_EMPLOYEE VARCHAR2  DEFAULT null,
P_DATE_OF_RECEIPT date DEFAULT null,
P_QUANTITY VARCHAR2  DEFAULT null,
P_DATE_OF_ISSUE date DEFAULT null,
P_ISSUER VARCHAR2  DEFAULT null,
P_REMARK VARCHAR2  DEFAULT null,
P_SUBCHILDCATEGORY VARCHAR2  DEFAULT null,
P_SUBCATEGORY VARCHAR2  DEFAULT null,
CALLVAL varchar2)
AS 
deptid varchar(250);
BEGIN

IF(CALLVAL ='0')  THEN
 INSERT INTO STATIONARY_DGH_USER(CATEGORY,EMPLOYEE,DATE_OF_RECEIPT,QUANTITY,DATE_OF_ISSUE,ISSUER,REMARK,status,CREATED_DATE,DEPT_ID,SUBCHILDCATEGORY,SUBCATEGORY,EMPLOYEE_STATUS) 
VALUES(P_CATEGORY,P_EMPLOYEE,P_DATE_OF_RECEIPT,P_QUANTITY,P_DATE_OF_ISSUE,P_ISSUER,P_REMARK,'1',sysdate,(select dept_id 
from v_emp_master vm where vm.emp_id=P_EMPLOYEE),P_SUBCHILDCATEGORY,P_SUBCATEGORY,(select status from V_EMP_MASTER where emp_id=P_EMPLOYEE));

OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;
end if;
IF(CALLVAL ='1')  THEN



OPEN DATA_CURSOR FOR SELECT ID,(select ITEMS_DESCRIPTION from STATIONARY_MATERIAL where ITEMCODE=CATEGORY)as CATEGORY,
(select distinct  Name from v_emp_master where emp_id=EMPLOYEE union select distinct username as name from STATIONARY_USERSDGH where
id=EMPLOYEE)as EMPLOYEE,
DATE_OF_RECEIPT,QUANTITY,DATE_OF_ISSUE,ISSUER,REMARK,DEPT_ID,SUBCHILDCATEGORY,
(select DESCRIPTION from stationarysubcategory where id=SUBCATEGORY)as SUBCATEGORY
from STATIONARY_DGH_USER;

END IF;
IF(CALLVAL ='2')  THEN



OPEN DATA_CURSOR FOR SELECT  ID,CATEGORY,
EMPLOYEE,DATE_OF_RECEIPT,QUANTITY,DATE_OF_ISSUE,ISSUER,REMARK,DEPT_ID,SUBCHILDCATEGORY,SUBCATEGORY from STATIONARY_DGH_USER where ID=P_ID;

END IF;
IF(CALLVAL ='3')  THEN


delete from STATIONARY_DGH_USER  where id=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;

END IF;
IF(CALLVAL ='4')  THEN


update STATIONARY_DGH_USER set CATEGORY=P_CATEGORY,EMPLOYEE=P_EMPLOYEE,
DATE_OF_RECEIPT=P_DATE_OF_RECEIPT,QUANTITY=P_QUANTITY,DATE_OF_ISSUE=P_DATE_OF_ISSUE,ISSUER=P_ISSUER,REMARK=P_REMARK,
SUBCHILDCATEGORY=P_SUBCHILDCATEGORY,SUBCATEGORY=P_SUBCATEGORY
where ID=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;
END IF;
 
END STATIONARY_DGHUSER_CRUD;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_IT_ITEM_RECEIPT
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_IT_ITEM_RECEIPT" (
DATA_CURSOR out SYS_REFCURSOR,
P_ID   VARCHAR2 DEFAULT null,
P_PUBLISHORDER VARCHAR2 DEFAULT null,
P_CONTRACTID VARCHAR2 DEFAULT null,
P_QUANTITY  VARCHAR2 DEFAULT null,
P_CATEGORY VARCHAR2 DEFAULT null,
P_SUBCATEGORY VARCHAR2  DEFAULT null,
P_SUBCHILDCATEGORY VARCHAR2  DEFAULT null,
P_RECEIVEDQUANTITY VARCHAR2  DEFAULT null,
P_REMAINING VARCHAR2  DEFAULT null,
P_ITEM_REMARKS VARCHAR2  DEFAULT null,
CALLVAL VARCHAR2
)
AS 
BEGIN
 if(CALLVAL=0) then
 insert into STATIONARY_IT_RECEIVED_ITEMS(PUBLISHID,CONTRACTID,QUANTITY,CATEGORY,SUBCATEGORY,SUBCHILDCATEGORY,STATUS,CREATED_DATE,RECEIVEDQUANTITY,REMAINING,REMARKS) 
 values(P_PUBLISHORDER,P_CONTRACTID,P_QUANTITY,P_CATEGORY,P_SUBCATEGORY,P_SUBCHILDCATEGORY,'1',sysdate,P_RECEIVEDQUANTITY,P_REMAINING,P_ITEM_REMARKS);
 OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;
 end if;
END STATIONARY_IT_ITEM_RECEIPT;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_IT_RELEASE_CRUD
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_IT_RELEASE_CRUD" 
(
DATA_CURSOR out SYS_REFCURSOR,
P_ID varchar2 default null,

P_CONTRACTID varchar2 default null,
P_PUBLISHID varchar2 default null,
P_SUBJECT varchar2 default null,
P_BODY varchar2 default null,
P_SIGNATURE varchar2 default null,
P_RECEIVEDBY varchar2 default null,
P_RECEIVEDDATE date,
callval varchar2 
)
AS 
releaseorderid varchar(250);
BEGIN
  if(callval='0')then
   
  select 'RLORD'|| to_char(sysdate,'YYMMDDHHMMSS') into releaseorderid from dual;
  insert into STATIONARY_IT_RELEASE_ORDER(CONTRACTID,RELEASEORDERID,status,created_date,subject,body,signature,receivedby,receiveddate)
  values(P_CONTRACTID,releaseorderid,'1',sysdate,P_SUBJECT,P_BODY,P_SIGNATURE,P_RECEIVEDBY,P_RECEIVEDDATE);
  
   OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;
  end if;
  
 if(callval='1')then
    OPEN DATA_CURSOR FOR SELECT ID,RELEASEORDERID,(select contractno from STATIONARY_CONTRACTFORM where contractid=sr.CONTRACTID)as CONTRACTID,CONTRACTID as CONTRACTNO,SUBJECT,BODY,SIGNATURE,RECEIVEDBY,RECEIVEDDATE FROM STATIONARY_IT_RELEASE_ORDER sr where status='1';
   
   end if;
    if(callval='2')then
    OPEN DATA_CURSOR FOR SELECT ID,RELEASEORDERID,CONTRACTID,SUBJECT,BODY,SIGNATURE,RECEIVEDBY,RECEIVEDDATE FROM STATIONARY_IT_RELEASE_ORDER where status='1' and id=P_ID;
   
   end if;
     if(callval='3')then
    update STATIONARY_IT_RELEASE_ORDER set status='0' where id=P_ID;
    OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;
   
   end if;
END STATIONARY_IT_RELEASE_CRUD;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_IT_REQUEST_CRUD
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_IT_REQUEST_CRUD" 

(
DATA_CURSOR out SYS_REFCURSOR,
P_ID  varchar DEFAULT null,
P_USERID varchar default null,
P_REMARKS varchar default null,
callval varchar
)
AS 
itissueid varchar(250);
BEGIN
if(callval='0') then
select 'ISSUE'||to_char(sysdate,'YYMMDDHHMMSS') into itissueid from dual;
 insert into STATIONARY_IT_REQUEST(userid,remarks,issueid,status,created_date)
 values(P_USERID,P_REMARKS,itissueid,'1',sysdate);
  open DATA_CURSOR for select  itissueid from dual;
 
 end if;
 if(callval='1') then
open DATA_CURSOR for select  ID,USERID,REMARKS,ISSUEID from STATIONARY_IT_REQUEST where status='1' ;
 end if;
  if(callval='2') then
open DATA_CURSOR for select  ID,USERID,REMARKS,ISSUEID from STATIONARY_IT_REQUEST where status='1' and issueid=P_ID;
 end if;
  if(callval='3') then
  update STATIONARY_IT_REQUEST set status='0' where issueid=P_ID;
  open DATA_CURSOR for select  'success' from dual;
 end if;
  if(callval='4') then
  update STATIONARY_IT_REQUEST set status='0' where id=P_ID;
  open DATA_CURSOR for select  'success' from dual;
 end if;
END STATIONARY_IT_REQUEST_CRUD;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_IT_REQUEST_ITEMS
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_IT_REQUEST_ITEMS" 
(
DATA_CURSOR out SYS_REFCURSOR,
P_ID  varchar DEFAULT null,
P_CATEGORY varchar DEFAULT null,
P_SUBCATEGORY varchar DEFAULT null,
P_SUBCHILDCATEGORY varchar DEFAULT null,
P_QUANTITY varchar default null,
P_ISSUEID varchar default null,
P_REMARKS varchar default null,
callval varchar
)
AS 
BEGIN
if(callval='0')  then
  insert into STATIONARY_IT_REQUEST_QUANTITY(CATEGORY,SUBCATEGORY,SUBCHILDCATEGORY ,QUANTITY,status,created_date,ISSUEID)
    values(P_CATEGORY,P_SUBCATEGORY,P_SUBCHILDCATEGORY ,P_QUANTITY,'1',sysdate,P_ISSUEID);
  open DATA_CURSOR for select  'success' from dual;
  end if;
if(callval='1')  then
open DATA_CURSOR for select  ID,CATEGORY,SUBCATEGORY,SUBCHILDCATEGORY,QUANTITY from STATIONARY_IT_REQUEST_QUANTITY where status='1' ;

end if;
if(callval='2')  then
open DATA_CURSOR for select  ID,CATEGORY,SUBCATEGORY,SUBCHILDCATEGORY,QUANTITY from STATIONARY_IT_REQUEST_QUANTITY where status='1' and ISSUEID=P_ISSUEID;

end if;
if(callval='3')  then
update STATIONARY_IT_REQUEST_QUANTITY  set status='0' where  ISSUEID=P_ISSUEID;
  open DATA_CURSOR for select  'success' from dual;
end if;
END STATIONARY_IT_REQUEST_ITEMS;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_IT_UPDATE_RECEIPT
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_IT_UPDATE_RECEIPT" 
(
DATA_CURSOR out SYS_REFCURSOR,
P_RELEASEORDERID VARCHAR2 DEFAULT null,
P_CHALLANNO VARCHAR2 DEFAULT null,
P_CHALLANDATE date DEFAULT null,
P_REMARKS VARCHAR2 DEFAULT null,
P_RECEIPTDATE date DEFAULT null,
CALLVAL VARCHAR2
)
AS 
BEGIN
if(CALLVAL='0') then
  update STATIONARY_IT_RELEASE_ORDER set
  CHALLANNO=P_CHALLANNO,
  CHALLANDATE=P_CHALLANDATE,
  REMARKS=P_REMARKS  
 ,RECEIPTDATE=P_RECEIPTDATE
  where ID=cast(P_RELEASEORDERID as int) ;
  OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;
  end if;
 if(CALLVAL='1') then
open  DATA_CURSOR for select RELEASEORDERID as PUBLISHORDER,CHALLANNO ,CHALLANDATE,RECEIPTDATE from  STATIONARY_IT_RELEASE_ORDER where status=1;
 end if;
  if(CALLVAL='2') then
 open  DATA_CURSOR for select CHALLANNO as CONTRACTID,CHALLANDATE,RECEIPTDATE from  STATIONARY_IT_RELEASE_ORDER where status=1 and id=cast(P_RELEASEORDERID as int);
 end if;
END STATIONARY_IT_UPDATE_RECEIPT;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_IT_VENDOR_CRUD
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_IT_VENDOR_CRUD" 
(
DATA_CURSOR out SYS_REFCURSOR,
P_ID VARCHAR2 DEFAULT null,
P_VENDORNAME VARCHAR2 DEFAULT null,
P_PHONENO VARCHAR2  DEFAULT null,

P_ADDRESS VARCHAR2  DEFAULT null,
P_TYPE VARCHAR2  DEFAULT null,
callval varchar2
)

AS 
BEGIN
  if(callval='0') then
 insert into stationary_it_vendor_details(vendorname,phoneno,address,apptype,status,created_date)
 values(P_VENDORNAME,P_PHONENO,P_ADDRESS,P_TYPE,'1',sysdate);
 open DATA_CURSOR for select 'success' from dual;
  end if;
   if(callval='1') then
   open DATA_CURSOR for select ID,VENDORNAME,PHONENO,ADDRESS from stationary_it_vendor_details where status='1';
   end if;
     if(callval='2') then
   open DATA_CURSOR for select ID,VENDORNAME,PHONENO,ADDRESS from stationary_it_vendor_details where status='1' and id=P_ID;
   end if;
      if(callval='3') then
      update stationary_it_vendor_details set status='0' where id=P_ID;
   open DATA_CURSOR for select 'success' from dual;
   end if;
    if(callval='4') then
      update stationary_it_vendor_details set VENDORNAME=P_VENDORNAME,PHONENO=P_PHONENO,ADDRESS=P_ADDRESS where id=P_ID;
  open DATA_CURSOR for select 'success' from dual;
   end if;
END STATIONARY_IT_VENDOR_CRUD;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_ITEM_ADDED_PROC
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_ITEM_ADDED_PROC" 

(
DATA_CURSOR out SYS_REFCURSOR,
P_ID  varchar DEFAULT null,
P_CATEGORY varchar DEFAULT null,
P_SUBCATEGORY varchar DEFAULT null,
P_SUBCHILDCATEGORY varchar DEFAULT null,
P_QUANTITY varchar default null,
P_CONTRACTID  varchar DEFAULT null,

callval varchar
)
AS 
checkcontractid varchar(250);
BEGIN
  if(callval='0') then 
 
insert into STATIONARY_IT_ITEM_ADDED(category,subcategory,subchildcategory,status,created_date,contractid,quantity)values(P_CATEGORY,P_SUBCATEGORY,P_SUBCHILDCATEGORY,'1',sysdate,P_CONTRACTID,P_QUANTITY);
open DATA_CURSOR for select  'success' from dual;
  end if;
   if(callval='1') then 
open DATA_CURSOR for select  ID,CONTRACTID,CATEGORY,SUBCATEGORY,SUBCHILDCATEGORY,QUANTITY from  STATIONARY_IT_ITEM_ADDED where contractid=P_CONTRACTID and status=1 order by id desc;
  end if;
  
  if(callval='2') then
  
  update STATIONARY_IT_ITEM_ADDED set status='0' where contractid=P_CONTRACTID;

 
  end if;
END STATIONARY_ITEM_ADDED_PROC;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_ITEMRECEIVED_CRUD
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_ITEMRECEIVED_CRUD" 
(
DATA_CURSOR out SYS_REFCURSOR,
P_ID int ,
P_ITEMID varchar2,
P_TOTAL_ITEM_RECEIVED varchar2,
P_TIMEOFRECEIVED varchar2,
P_DATEOFRECEIVED date,
P_ITEM_TYPE varchar2,
CALLVAL varchar2
)
AS 
 
BEGIN
  if(CALLVAL='0') then 
 -- update STATIONARY_RECEIVED_ITEMS set status='0' where ITEMID= P_ITEMID and ITEM_TYPE=P_ITEM_TYPE;
  insert into STATIONARY_RECEIVED_ITEMS(ITEMID,TOTAL_ITEM_RECEIVED,TIMEOFRECEIVED,DATEOFRECEIVED,STATUS,CREATED_DATE,ITEM_TYPE)values(P_ITEMID,P_TOTAL_ITEM_RECEIVED,P_TIMEOFRECEIVED
  ,P_DATEOFRECEIVED,'1',sysdate,P_ITEM_TYPE);
  
 open DATA_CURSOR for select 'success' from dual;
  end if;
   if(CALLVAL='1') then 
  open DATA_CURSOR for  select ID,ITEMID,TOTAL_ITEM_RECEIVED,TIMEOFRECEIVED,DATEOFRECEIVED from 
  STATIONARY_RECEIVED_ITEMS where status='1' and ITEMID=TO_CHAR(P_ID) and ITEM_TYPE=P_ITEM_TYPE;
   end if;
     if(CALLVAL='2') then 
     update STATIONARY_RECEIVED_ITEMS set status='0' where id=P_ID;
     
   open DATA_CURSOR for select 'success' from dual;
   end if;
    if(CALLVAL='3') then
     update STATIONARY_RECEIVED_ITEMS set status='0' where ITEMID= P_ITEMID and ITEM_TYPE=P_ITEM_TYPE;
      open DATA_CURSOR for select 'success' from dual;
    end if;
END STATIONARY_ITEMRECEIVED_CRUD;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_MATERIAL_COMPANY
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_MATERIAL_COMPANY" 
(DATA_CURSOR out SYS_REFCURSOR,
DATA_CURSOR1 out SYS_REFCURSOR,
DATA_CURSOR2 out SYS_REFCURSOR,
DATA_CURSOR3 out SYS_REFCURSOR,
P_TYPE VARCHAR2,
CALLVAL VARCHAR2
)
AS 
BEGIN
 IF(CALLVAL ='0')  THEN
if(P_TYPE='BOTH')then
OPEN DATA_CURSOR FOR SELECT ID,ITEMS_DESCRIPTION,TYPE,CREATED_DATE,STATUS,ITEMCODE from stationary_material ;
else


OPEN DATA_CURSOR FOR SELECT ID,ITEMS_DESCRIPTION,TYPE,CREATED_DATE,STATUS,ITEMCODE from stationary_material where type=P_TYPE;
end if;
OPEN DATA_CURSOR1 FOR SELECT ID,COMPANYNAME from stationaryitemcompany ;
OPEN DATA_CURSOR2 FOR SELECT ID,UNITS_DESCRIPTION from stationary_units ;
OPEN DATA_CURSOR3 FOR SELECT 'success' from dual ;
END IF;
END STATIONARY_MATERIAL_COMPANY;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_MATERITEMS
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_MATERITEMS" (
DATA_CURSOR out SYS_REFCURSOR,
P_ID VARCHAR2 DEFAULT null,
P_ITEMS_DESCRIPTION VARCHAR2 DEFAULT null,
P_TYPE VARCHAR2  DEFAULT null,
P_APP_TYPE VARCHAR2 DEFAULT null,
CALLVAL VARCHAR2)
AS 
maxid number;
ITEM_CODE1 varchar(250);
iduse varchar(50);
count1 int;
BEGIN
  IF(CALLVAL ='0')  THEN
SELECT NVL( MAX( maxid ), 0 ) + 1 INTO maxid   
FROM   stationary_material;
select count(*) into count1 from stationary_material where ITEMS_DESCRIPTION=P_ITEMS_DESCRIPTION;
if(count1=0) then 
if(P_TYPE='Print') then

select 'ITEMP0'||TO_CHAR(SYSDATE,'YYMMDDHH24MISS')  into ITEM_CODE1 from dual;
else
select 'ITEMS0'||TO_CHAR(SYSDATE,'YYMMDDHH24MISS')  into ITEM_CODE1 from dual;
end if;
INSERT INTO stationary_material(ITEMS_DESCRIPTION,STATUS,CREATED_DATE,TYPE,ITEMCODE,apptype) VALUES(P_ITEMS_DESCRIPTION,'1',sysdate,P_TYPE,ITEM_CODE1,P_APP_TYPE);

OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;
else
OPEN DATA_CURSOR FOR SELECT 'Already Present' FROM DUAL;
end if;
END IF;
IF(CALLVAL ='1')  THEN



OPEN DATA_CURSOR FOR SELECT ID,ITEMS_DESCRIPTION,TYPE,CREATED_DATE,STATUS,ITEMCODE from stationary_material where status=1 and apptype=P_APP_TYPE;

END IF;
IF(CALLVAL ='2')  THEN



OPEN DATA_CURSOR FOR SELECT ID,ITEMS_DESCRIPTION,TYPE,ITEMCODE from stationary_material where ID=P_ID and status=1 ;

END IF;
IF(CALLVAL ='3')  THEN
select ITEMCODE into ITEM_CODE1  from STATIONARY_MATERIAL where id=P_ID;
select count(category) into iduse  from (
select category as category  from STATIONARY_REPOSITORY where CATEGORY=ITEM_CODE1 union
select category as category from STATIONARY_PRINT_REPOSITORY where CATEGORY=ITEM_CODE1 union
select category as category from STATIONARY_DGH_USER where CATEGORY=ITEM_CODE1);
if(iduse=0)then

delete from stationary_material  where id=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;
else
OPEN DATA_CURSOR FOR SELECT 'Item is In Use' from dual;
end if;

END IF;
IF(CALLVAL ='4')  THEN


update stationary_material set ITEMS_DESCRIPTION=P_ITEMS_DESCRIPTION,TYPE=P_TYPE  where ID=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;

END IF;
IF(CALLVAL ='5')  THEN


OPEN DATA_CURSOR FOR SELECT ID,ITEMS_DESCRIPTION,TYPE,CREATED_DATE,STATUS,ITEMCODE from stationary_material where type=P_TYPE and apptype=P_APP_TYPE;
END IF;

END STATIONARY_MATERITEMS;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_PRINT_REP_CRUD
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_PRINT_REP_CRUD" 
(
 DATA_CURSOR out SYS_REFCURSOR,
P_ID VARCHAR2 DEFAULT null,
P_CATEGORY VARCHAR2 DEFAULT null,
P_BRAND VARCHAR2  DEFAULT null,
P_ANNUAL_REQUIREMENT VARCHAR2 DEFAULT null,
P_UNIT VARCHAR2  DEFAULT null,
P_RATE VARCHAR2 DEFAULT null,
P_GST_RATE VARCHAR2  DEFAULT null,
P_GST_AMOUNT VARCHAR2  DEFAULT null,
P_TOTAL_ITEM_ORDER VARCHAR2 DEFAULT null,
P_TOTAL_ITEM_RECEIVED VARCHAR2  DEFAULT null,
P_DATEOFORDER date,
P_DATEOFRECEIVED date,
P_SUBCATEGORY  VARCHAR2 DEFAULT null,
P_SUBCHILDCATEGORY  VARCHAR2 DEFAULT null,
P_TIMEOFORDER VARCHAR2 DEFAULT null,
P_TIMEOFRECEIVED VARCHAR2 DEFAULT null,
CALLVAL varchar2
) AS 
BEGIN
 
 IF(CALLVAL ='0')  THEN

INSERT INTO stationary_print_repository(CATEGORY,BRAND,ANNUAL_REQUIREMENT,UNIT,RATE,GST_RATE,GST_AMOUNT,TOTAL_ITEM_ORDER,
TOTAL_ITEM_RECEIVED,DATEOFRECEIVED,STATUS,CREATED_DATE,SUBCHILDCATEGORY,DATEOFORDER,SUBCATEGORY,TIMEOFORDER,TIMEOFRECEIVED) 
VALUES(P_CATEGORY,P_BRAND,P_ANNUAL_REQUIREMENT,P_UNIT,P_RATE,P_GST_RATE,P_GST_AMOUNT,P_TOTAL_ITEM_ORDER,P_TOTAL_ITEM_RECEIVED
,P_DATEOFRECEIVED,'1',sysdate,P_SUBCHILDCATEGORY,P_DATEOFORDER,P_SUBCATEGORY,P_TIMEOFORDER,P_TIMEOFRECEIVED);

OPEN DATA_CURSOR FOR SELECT  max(id)  from  stationary_print_repository;
END IF;
IF(CALLVAL ='1')  THEN



OPEN DATA_CURSOR FOR SELECT ID,(select ITEMS_DESCRIPTION from STATIONARY_MATERIAL where ITEMCODE=CATEGORY)as CATEGORY,
 BRAND,
ANNUAL_REQUIREMENT,(select UNITS_DESCRIPTION from stationary_units where id=UNIT)as UNIT,
RATE,GST_RATE,GST_AMOUNT,TOTAL_ITEM_ORDER,
(select sum(total_item_received) from STATIONARY_RECEIVED_ITEMS st where st.itemid=To_Char(sp.ID) and item_type='Print' and status='1') as TOTAL_ITEM_RECEIVED,
TOTAL_ITEM_RECEIVED,DATEOFRECEIVED,DATEOFORDER,SUBCATEGORY,SUBCHILDCATEGORY,TIMEOFORDER,TIMEOFRECEIVED from stationary_print_repository sp;

END IF;
IF(CALLVAL ='2')  THEN



OPEN DATA_CURSOR FOR SELECT ID,CATEGORY,BRAND,ANNUAL_REQUIREMENT,UNIT,RATE,GST_RATE,GST_AMOUNT,TOTAL_ITEM_ORDER,TOTAL_ITEM_RECEIVED,
DATEOFRECEIVED,DATEOFORDER,SUBCATEGORY,SUBCHILDCATEGORY,TIMEOFORDER,TIMEOFRECEIVED from stationary_print_repository where ID=P_ID;

END IF;
IF(CALLVAL ='3')  THEN


delete from stationary_print_repository  where id=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;

END IF;
IF(CALLVAL ='4')  THEN


update stationary_print_repository set CATEGORY=P_CATEGORY,BRAND=P_BRAND,ANNUAL_REQUIREMENT=P_ANNUAL_REQUIREMENT,
UNIT=P_UNIT,RATE=P_RATE,GST_RATE=P_GST_RATE,GST_AMOUNT=P_GST_AMOUNT,TOTAL_ITEM_ORDER=P_TOTAL_ITEM_ORDER,TOTAL_ITEM_RECEIVED=P_TOTAL_ITEM_RECEIVED,
DATEOFRECEIVED=P_DATEOFRECEIVED,DATEOFORDER=P_DATEOFORDER,SUBCATEGORY=P_SUBCATEGORY,SUBCHILDCATEGORY=P_SUBCHILDCATEGORY,TIMEOFORDER=P_TIMEOFORDER,TIMEOFRECEIVED=P_TIMEOFRECEIVED
where ID=P_ID;
OPEN DATA_CURSOR FOR SELECT P_ID from dual;

END IF;
 
END STATIONARY_PRINT_REP_CRUD;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_REPORT
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_REPORT" 
(
DATA_CURSOR out SYS_REFCURSOR,
DATA_CURSOR1 out SYS_REFCURSOR,
P_CATEGORY varchar2 ,
P_EMPLOYEE varchar2 ,
P_EMPLOYEE_STATUS varchar2 ,
P_SUBCATEGORY varchar2 default null,
P_SUBCHILDCATEGORY varchar2 default null,
P_DEPTID varchar2,
P_YEARDATE varchar2,
P_FROM_DATE date,
P_TO_DATE date,


CALLVAL VARCHAR2
)
AS 
consume int;


BEGIN

  if(CALLVAL='0') then
 
   open DATA_CURSOR for select (select  COALESCE(sum(TOTAL_ITEM_RECEIVED),0) from 
   (select (select sum(total_item_received) from STATIONARY_RECEIVED_ITEMS st where st.itemid=To_Char(sr.ID) and item_type='Stationary' and status='1') as TOTAL_ITEM_RECEIVED from stationary_repository sr where 
   (CATEGORY=P_CATEGORY  or P_CATEGORY is null) and 
   (SUBCATEGORY=P_SUBCATEGORY or P_SUBCATEGORY is null)
   and (SUBCHILDCATEGORY=P_SUBCHILDCATEGORY or P_SUBCHILDCATEGORY is null)
   
   union all
   select (select sum(total_item_received) from STATIONARY_RECEIVED_ITEMS st where st.itemid=To_Char(sp.ID) and item_type='Print' and status='1') as TOTAL_ITEM_RECEIVED from STATIONARY_PRINT_REPOSITORY sp where 
   (CATEGORY=P_CATEGORY  or P_CATEGORY is null) and 
   (SUBCATEGORY=P_SUBCATEGORY or P_SUBCATEGORY is null)
   and (SUBCHILDCATEGORY=P_SUBCHILDCATEGORY or P_SUBCHILDCATEGORY is null)))
   as IN_STOCK ,
    (select COALESCE(sum(quantity),0) from STATIONARY_DGH_USER sd left join  v_emp_master vm on sd.EMPLOYEE=vm.EMP_ID 
 where 
   (CATEGORY=P_CATEGORY  or P_CATEGORY is null) and (SUBCATEGORY=P_SUBCATEGORY or P_SUBCATEGORY is null)
   and (SUBCHILDCATEGORY=P_SUBCHILDCATEGORY or P_SUBCHILDCATEGORY is null)
   and (EMPLOYEE=P_EMPLOYEE or P_EMPLOYEE is null)
   and   (sd.DEPT_ID=P_DEPTID or P_DEPTID is null)
     and (vm.STATUS=P_EMPLOYEE_STATUS or P_EMPLOYEE_STATUS is null)
   and (date_of_issue between P_FROM_DATE and  P_TO_DATE or P_FROM_DATE is null or P_TO_DATE is null)
 )
   as CONSUME  from dual;
    open DATA_CURSOR1 for   
    select 
   (select items_description from stationary_material where itemcode= CATEGORY) as CATEGORY,
   (select description from STATIONARYSUBCATEGORY where id=SUBCATEGORY) as SUBCATEGORY,
    (select description from STATIONARYSUBCATEGORY where id=SUBCHILDCATEGORY) as SUBCHILDCATEGORY,
   (SELECT name FROM
      v_emp_master where emp_id=EMPLOYEE union select username as name from STATIONARY_USERSDGH where id=EMPLOYEE) as EMPLOYEE 
   ,QUANTITY,DATE_OF_RECEIPT,DATE_OF_ISSUE , ISSUER,REMARK
   ,  vm.DEPT_NAME as DEPT_ID
    from STATIONARY_DGH_USER sd left join  v_emp_master vm on sd.EMPLOYEE=vm.EMP_ID  where 
     (CATEGORY=P_CATEGORY or P_CATEGORY is null)
     and (SUBCATEGORY=P_SUBCATEGORY or P_SUBCATEGORY is null)
 and (SUBCHILDCATEGORY=P_SUBCHILDCATEGORY or P_SUBCHILDCATEGORY is null)
  and (EMPLOYEE=P_EMPLOYEE or P_EMPLOYEE is null)
  and (sd.DEPT_ID=P_DEPTID or P_DEPTID is null)
   and (vm.STATUS=P_EMPLOYEE_STATUS or P_EMPLOYEE_STATUS is null)
  -- and (select status from V_EMP_MASTER where EMPLOYEE=P_EMPLOYEE_STATUS or P_EMPLOYEE_STATUS is null)
   and (date_of_issue between P_FROM_DATE and  P_TO_DATE or P_FROM_DATE is null or P_TO_DATE is null)
   --  and (CREATED_DATE=P_TO_DATE or P_TO_DATE is null)
  
    ;
    
   end if;
     if(CALLVAL='1') then
   
     select COALESCE(sum(quantity),0) into consume from STATIONARY_DGH_USER where 
   (CATEGORY=P_CATEGORY  or P_CATEGORY is null)
   and (SUBCATEGORY=P_SUBCATEGORY or P_SUBCATEGORY is null)
 and   (SUBCHILDCATEGORY=P_SUBCHILDCATEGORY or P_SUBCHILDCATEGORY is null);
    --open data_cursor for select consume from dual;
     
    
 open DATA_CURSOR for select IN_STOCK -consume as IN_STOCK from ( select COALESCE(sum(TOTAL_ITEM_RECEIVED),0) as IN_STOCK from 
  (select (select sum(total_item_received) from STATIONARY_RECEIVED_ITEMS st where st.itemid=To_Char(sp.ID) 
    and item_type='Stationary' and status='1') TOTAL_ITEM_RECEIVED from stationary_repository sp
    where 
   (CATEGORY=P_CATEGORY  or P_CATEGORY is null) and 
   (SUBCATEGORY=P_SUBCATEGORY or P_SUBCATEGORY is null)
 and (SUBCHILDCATEGORY=P_SUBCHILDCATEGORY or P_SUBCHILDCATEGORY is null)
  union all
   select (select sum(total_item_received) from STATIONARY_RECEIVED_ITEMS st where st.itemid=To_Char(sr.ID) and item_type='Print' and status='1'
   ) TOTAL_ITEM_RECEIVED from STATIONARY_PRINT_REPOSITORY sr where 
   (CATEGORY=P_CATEGORY  or P_CATEGORY is null) and 
   (SUBCATEGORY=P_SUBCATEGORY or P_SUBCATEGORY is null)
   and (SUBCHILDCATEGORY=P_SUBCHILDCATEGORY or P_SUBCHILDCATEGORY is null)
   )
   )
  
  ;

     end if;
END STATIONARY_REPORT;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_REPOSITORY_CRUD
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_REPOSITORY_CRUD" 
(
  DATA_CURSOR out SYS_REFCURSOR,
P_ID VARCHAR2 DEFAULT null,
P_CATEGORY VARCHAR2 DEFAULT null,
P_COMPANY VARCHAR2  DEFAULT null,
P_ESTIMATED_QUANTITY VARCHAR2 DEFAULT null,
P_UNIT VARCHAR2  DEFAULT null,
P_BASIC_AMOUNT VARCHAR2 DEFAULT null,
P_GST VARCHAR2  DEFAULT null,
P_TOTAL_ITEM_ORDER VARCHAR2 DEFAULT null,
P_TOTAL_ITEM_RECEIVED VARCHAR2  DEFAULT null,
P_DATEOFRECEIVED date,
P_DATEOFORDER date,
P_SUBCATEGORY  VARCHAR2 DEFAULT null,
P_SUBCHILDCATEGORY  VARCHAR2 DEFAULT null,
P_TIMEOFORDER VARCHAR2 DEFAULT null ,
P_TIMEOFRECEIVED VARCHAR2 DEFAULT null,
CALLVAL varchar2
) AS 


BEGIN
 IF(CALLVAL ='0')  THEN

INSERT INTO stationary_repository(CATEGORY,COMPANY,ESTIMATED_QUANTITY,UNIT,BASIC_AMOUNT,GST,TOTAL_ITEM_ORDER,TOTAL_ITEM_RECEIVED,DATEOFRECEIVED,DATEOFORDER,STATUS,CREATED_DATE,SUBCATEGORY,SUBCHILDCATEGORY,TIMEOFORDER,TIMEOFRECEIVED) 
VALUES(P_CATEGORY,P_COMPANY,P_ESTIMATED_QUANTITY,P_UNIT,P_BASIC_AMOUNT,P_GST,P_TOTAL_ITEM_ORDER,P_TOTAL_ITEM_RECEIVED,P_DATEOFRECEIVED,P_DATEOFORDER,'1',sysdate,P_SUBCATEGORY,P_SUBCHILDCATEGORY,P_TIMEOFORDER,P_TIMEOFRECEIVED);

  
OPEN DATA_CURSOR FOR select max(id)  from  stationary_repository ;
END IF;
IF(CALLVAL ='1')  THEN



OPEN DATA_CURSOR FOR SELECT ID,(select ITEMS_DESCRIPTION from STATIONARY_MATERIAL where ITEMCODE=CATEGORY)as CATEGORY,
(select COMPANYNAME from stationaryitemcompany where id=COMPANY) as COMPANY,
(select description from STATIONARYSUBCATEGORY where id=SUBCATEGORY) as SUBCATEGORY,
ESTIMATED_QUANTITY,(select UNITS_DESCRIPTION from stationary_units where id=UNIT)as UNIT,BASIC_AMOUNT,
GST,TOTAL_ITEM_ORDER,

(select sum(total_item_received) from STATIONARY_RECEIVED_ITEMS st where st.itemid=sr.ID and item_type='Stationary' and status='1') as TOTAL_ITEM_RECEIVED,
--'5' as TOTAL_ITEM_RECEIVED,
DATEOFRECEIVED,
DATEOFORDER,TIMEOFORDER,TIMEOFRECEIVED,
case when SUBCHILDCATEGORY = 'null' then SUBCHILDCATEGORY else
 (select description from STATIONARYSUBCATEGORY where id=SUBCHILDCATEGORY) end as SUBCHILDCATEGORY 
 from stationary_repository  sr order by id desc
;

END IF;
IF(CALLVAL ='2')  THEN



OPEN DATA_CURSOR FOR SELECT ID,CATEGORY,COMPANY,ESTIMATED_QUANTITY,UNIT,BASIC_AMOUNT,GST,TOTAL_ITEM_ORDER,TOTAL_ITEM_RECEIVED,DATEOFRECEIVED,DATEOFORDER,SUBCATEGORY,SUBCHILDCATEGORY
,TIMEOFORDER,TIMEOFRECEIVED from stationary_repository where ID=P_ID;

END IF;
IF(CALLVAL ='3')  THEN


delete from stationary_repository  where id=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;

END IF;
IF(CALLVAL ='4')  THEN


update stationary_repository set CATEGORY=P_CATEGORY,COMPANY=P_COMPANY,ESTIMATED_QUANTITY=P_ESTIMATED_QUANTITY,
UNIT=P_UNIT,BASIC_AMOUNT=P_BASIC_AMOUNT,GST=P_GST,TOTAL_ITEM_ORDER=P_TOTAL_ITEM_ORDER,TOTAL_ITEM_RECEIVED=P_TOTAL_ITEM_RECEIVED,
DATEOFRECEIVED=P_DATEOFRECEIVED,DATEOFORDER=P_DATEOFORDER,SUBCATEGORY=P_SUBCATEGORY,SUBCHILDCATEGORY=P_SUBCHILDCATEGORY,
TIMEOFORDER=P_TIMEOFORDER,TIMEOFRECEIVED=P_TIMEOFRECEIVED

where ID=P_ID;
OPEN DATA_CURSOR FOR SELECT P_ID from dual;

END IF;
END STATIONARY_REPOSITORY_CRUD;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_ROLE_CRUD
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_ROLE_CRUD" 
(DATA_CURSOR out SYS_REFCURSOR,
P_ID VARCHAR2 DEFAULT null,
P_NAME VARCHAR2 DEFAULT null,
P_DESCRIPTION  VARCHAR2 DEFAULT null,
CALLVAL varchar2
)
AS 
BEGIN
 if(CALLVAL='0') then
  
 insert into STATIONARY_ROLE_MASTER(Id,NAME,DESCRIPTION,status,created_date)VALUES(SYS_GUID(),UPPER(P_NAME),P_DESCRIPTION,'1',sysdate);
 OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;
  end if;
  
  IF(CALLVAL ='1')  THEN



OPEN DATA_CURSOR FOR SELECT ID as id,NAME as Name,DESCRIPTION as Description from STATIONARY_ROLE_MASTER where status=1;

END IF;

IF(CALLVAL ='2')  THEN


OPEN DATA_CURSOR FOR SELECT ID as id,NAME,DESCRIPTION from STATIONARY_ROLE_MASTER where ID=P_ID and status=1 ;

END IF;
IF(CALLVAL ='3')  THEN
update STATIONARY_ROLE_MASTER set status='0' where id=P_ID;
 OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;

end if;
IF(CALLVAL ='4')  THEN


OPEN DATA_CURSOR FOR SELECT ID as id,Upper(NAME)as Name,DESCRIPTION from STATIONARY_ROLE_MASTER where name=P_NAME and status=1 ;

END IF;
IF(CALLVAL ='5')  THEN

update STATIONARY_ROLE_MASTER set Name=Upper(P_NAME),DESCRIPTION=P_DESCRIPTION where id=P_ID;
 OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;

END IF;
END STATIONARY_ROLE_CRUD;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_STOCKGET
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_STOCKGET" 
(
 DATA_CURSOR out SYS_REFCURSOR,
P_PARENTID varchar2 default null,
P_SUBCATEGORY varchar2 default null,
P_SUBChildCATEGORY  varchar2 default null
)
AS 
stock int;
BEGIN

open DATA_CURSOR for
  select sum(TOTAL_ITEM_ORDER) into stock from
(select TOTAL_ITEM_ORDER as TOTAL_ITEM_ORDER  from STATIONARY_REPOSITORY where category=P_PARENTID
union
select TOTAL_ITEM_ORDER as TOTAL_ITEM_ORDER from STATIONARY_PRINT_REPOSITORY where category=P_PARENTID);
END STATIONARY_STOCKGET;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_SUBCATEGORY
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_SUBCATEGORY" (
DATA_CURSOR out SYS_REFCURSOR,
P_ID VARCHAR2 DEFAULT null,
P_DESCRIPTION VARCHAR2 DEFAULT null,
P_PARENTID VARCHAR2 DEFAULT null,
P_CATEGORY varchar2 default null,
P_CATEGORYTYPE varchar default null,
CALLVAL VARCHAR2)
AS 
ITEM_CODE varchar(250);
stock int;
BEGIN
  IF(CALLVAL ='0')  THEN
  if(P_CATEGORY='SubCategory') then
  select 'C'||TO_CHAR(SYSDATE,'YYMMDDHH24MISS')  into ITEM_CODE from dual;
  else
select 'SUBC'||TO_CHAR(SYSDATE,'YYMMDDHH24MISS')  into ITEM_CODE from dual;
end if;
INSERT INTO stationarysubcategory(DESCRIPTION,STATUS,CREATED_DATE,PARENT_ID,childitemcode,CATEGORYTYPE) VALUES(P_DESCRIPTION,'1',sysdate,P_PARENTID,ITEM_CODE,P_CATEGORYTYPE);

OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;
END IF;
IF(CALLVAL ='1')  THEN
if(P_CATEGORY='SubCategory') then
OPEN DATA_CURSOR FOR SELECT ID,DESCRIPTION,CREATED_DATE,STATUS, 
( select distinct ITEMS_DESCRIPTION from STATIONARY_MATERIAL where itemcode=st.PARENT_ID 
)as
PARENT_ID from stationarysubcategory st where CATEGORYTYPE= P_CATEGORYTYPE and  PARENT_iD in (select itemcode from stationary_material); 
else

OPEN DATA_CURSOR FOR SELECT ID,DESCRIPTION,CREATED_DATE,STATUS, 
( select distinct DESCRIPTION from stationarysubcategory where id=st.PARENT_ID
) 
as PARENT_ID  from stationarysubcategory st  where CATEGORYTYPE= P_CATEGORYTYPE and PARENT_iD not in (select itemcode from stationary_material);
END IF;
END IF;
IF(CALLVAL ='2')  THEN



OPEN DATA_CURSOR FOR SELECT ID,DESCRIPTION,PARENT_ID from stationarysubcategory where ID=P_ID;

END IF;
IF(CALLVAL ='3')  THEN


delete from stationarysubcategory  where ID=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;

END IF;
IF(CALLVAL ='4')  THEN


update stationarysubcategory set DESCRIPTION=P_DESCRIPTION,PARENT_ID=P_PARENTID  where ID=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;
END IF;
IF(CALLVAL ='5')  THEN
if(P_CATEGORY='SubCategory') then

OPEN DATA_CURSOR FOR  SELECT ITEMCODE as CHILDITEMCODE,ITEMS_DESCRIPTION as DESCRIPTION from stationary_material where apptype=P_CATEGORYTYPE;

else 
OPEN DATA_CURSOR FOR  SELECT ID as CHILDITEMCODE,DESCRIPTION as DESCRIPTION from STATIONARYSUBCATEGORY where parent_id like 'ITEMS%' and CATEGORYTYPE=P_CATEGORYTYPE;
end if;
END IF;
IF(CALLVAL ='6')  THEN



OPEN DATA_CURSOR FOR SELECT ID,DESCRIPTION ,PARENT_ID,STATUS 

    from 
  stationarysubcategory ;--where  PARENT_ID=P_PARENTID ;

END IF;
END STATIONARY_SUBCATEGORY;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_UNITS_TABLE
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_UNITS_TABLE" 
 (
DATA_CURSOR out SYS_REFCURSOR,
P_ID VARCHAR2 DEFAULT null,
P_UNITS_DESCRIPTION VARCHAR2 DEFAULT null,

CALLVAL VARCHAR2)
AS 
BEGIN
  IF(CALLVAL ='0')  THEN

INSERT INTO stationary_units(UNITS_DESCRIPTION,STATUS,CREATED_DATE) VALUES(P_UNITS_DESCRIPTION,'1',sysdate);

OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;
END IF;
IF(CALLVAL ='1')  THEN



OPEN DATA_CURSOR FOR SELECT ID,UNITS_DESCRIPTION,CREATED_DATE,STATUS from stationary_units;

END IF;
IF(CALLVAL ='2')  THEN



OPEN DATA_CURSOR FOR SELECT ID,UNITS_DESCRIPTION from stationary_units where ID=P_ID;

END IF;
IF(CALLVAL ='3')  THEN


delete from stationary_units  where ID=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;

END IF;
IF(CALLVAL ='4')  THEN


update stationary_units set UNITS_DESCRIPTION=P_UNITS_DESCRIPTION  where ID=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;
END IF;
END STATIONARY_UNITS_TABLE;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_USER_ROLE_INSERT
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_USER_ROLE_INSERT" (
DATA_CURSOR out SYS_REFCURSOR,
P_USERID VARCHAR2 DEFAULT null,
P_ROLE_ID VARCHAR2 DEFAULT null,
CALLVAL VARCHAR2
)
AS 
checkrole int;
BEGIN
if(CALLVAL='0')then
  insert into STATIONARY_USER_ROLE(userid,roleid,status,created_date)values(P_USERID,P_ROLE_ID,'1',sysdate); 
  open DATA_CURSOR for select 'success' from dual;
  end if;
  IF(CALLVAL ='1')  THEN
open DATA_CURSOR for  select Name  as Roles from STATIONARY_ROLE_MASTER where id in( select roleid from STATIONARY_USER_ROLE where userid=P_USERID);
end if;
 IF(CALLVAL ='3')  THEN
open DATA_CURSOR for   select USERID,ROLEID from STATIONARY_USER_ROLE;
end if;

 IF(CALLVAL ='4')  THEN
 select count(*) into checkrole from STATIONARY_USER_ROLE where ROLEID=P_ROLE_ID;
 if (checkrole>0)then
  open DATA_CURSOR for   select 'false' from dual;
 else
 open DATA_CURSOR for   select 'true' from dual;
 end if;

end if;
END STATIONARY_USER_ROLE_INSERT;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARY_USERDGH_CRUD
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARY_USERDGH_CRUD" (
DATA_CURSOR out SYS_REFCURSOR,
P_ID VARCHAR2 DEFAULT null,
P_USERNAME VARCHAR2 DEFAULT null,
P_EMAILID VARCHAR2 DEFAULT null,
P_PHONENO VARCHAR2 DEFAULT null,
P_DEPTID VARCHAR2 DEFAULT null,
P_PASSWORD  VARCHAR2 DEFAULT null,
CALLVAL VARCHAR2)
AS 
emailcheck varchar(250);
userguid varchar(250);
BEGIN
  IF(CALLVAL ='0')  THEN
select SYS_GUID() into  userguid from dual;
INSERT INTO STATIONARY_USERSDGH(ID,USERNAME,EMAILID,PHONENO,status,CREATED_DATE,DEPTID,PASSWORD) VALUES(userguid,Upper(P_USERNAME),P_EMAILID,P_PHONENO,'1',sysdate,P_DEPTID,P_PASSWORD);

OPEN DATA_CURSOR FOR SELECT 'SUCCESS',userguid FROM DUAL;

END IF;
IF(CALLVAL ='1')  THEN



OPEN DATA_CURSOR FOR SELECT ID,USERNAME as UserName,EMAILID as Email,PHONENO as PhoneNumber,
--case when DEPTID= '' then 'Not Allocated' else (select dept_name from poms_dept_master where dept_id=DEPTID)end  as DEPTID,
CREATED_DATE,STATUS from STATIONARY_USERSDGH;

END IF;
IF(CALLVAL ='2')  THEN



OPEN DATA_CURSOR FOR SELECT ID,USERNAME as UserName,EMAILID as Email,PHONENO as PhoneNumber,PASSWORD as PasswordHash
--,(select dept_name from poms_dept_master where dept_id=DEPTID) as DEPTID
from STATIONARY_USERSDGH where ID=P_ID;

END IF;
IF(CALLVAL ='3')  THEN


delete from STATIONARY_DGH_USER  where ID=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;

END IF;
IF(CALLVAL ='4')  THEN


update STATIONARY_USERSDGH set USERNAME=P_USERNAME,EMAILID=P_EMAILID,PHONENO=P_PHONENO,DEPTID=P_DEPTID  where ID=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;
END IF;

IF(CALLVAL ='6')  THEN



OPEN DATA_CURSOR FOR SELECT ID,ID,USERNAME as UserName,EMAILID as Email,PHONENO,PASSWORD as PasswordHash
--,(select dept_name from poms_dept_master where dept_id=DEPTID) as DEPTID
from STATIONARY_USERSDGH where emailid=LOWER(P_USERNAME)or username=P_USERNAME;
end if;
IF(CALLVAL ='7')  THEN



OPEN DATA_CURSOR FOR SELECT ID,ID,USERNAME as UserName,EMAILID as Email,PHONENO,PASSWORD as PasswordHash
--,(select dept_name from poms_dept_master where dept_id=DEPTID) as DEPTID
from STATIONARY_USERSDGH where emailid=LOWER(P_EMAILID) ;
end if;
IF(CALLVAL ='8')  THEN



OPEN DATA_CURSOR FOR SELECT ID,USERNAME as UserName,EMAILID as Email,PHONENO,PASSWORD as PasswordHash
--,(select dept_name from poms_dept_master where dept_id=DEPTID) as DEPTID
from STATIONARY_USERSDGH where ID=P_ID ;
end if;

END STATIONARY_USERDGH_CRUD;

/
--------------------------------------------------------
--  DDL for Procedure STATIONARYITEMCOMAPANYCRUD
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STATIONARYITEMCOMAPANYCRUD" (
DATA_CURSOR out SYS_REFCURSOR,
P_ID VARCHAR2 DEFAULT null,
P_COMPANYNAME VARCHAR2 DEFAULT null,

CALLVAL VARCHAR2)
AS 

BEGIN
 IF(CALLVAL ='0')  THEN

INSERT INTO stationaryitemcompany(COMPANYNAME,STATUS,CREATED_DATE) VALUES(P_COMPANYNAME,'1',sysdate);

OPEN DATA_CURSOR FOR SELECT 'SUCCESS' FROM DUAL;
END IF;
IF(CALLVAL ='1')  THEN



OPEN DATA_CURSOR FOR SELECT ID,COMPANYNAME,CREATED_DATE,STATUS from stationaryitemcompany;

END IF;
IF(CALLVAL ='2')  THEN



OPEN DATA_CURSOR FOR SELECT ID,COMPANYNAME from stationaryitemcompany where ID=P_ID;

END IF;
IF(CALLVAL ='3')  THEN


delete from stationaryitemcompany  where id=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;

END IF;
IF(CALLVAL ='4')  THEN


update stationaryitemcompany set COMPANYNAME=P_COMPANYNAME where ID=P_ID;
OPEN DATA_CURSOR FOR SELECT 'SUCCESS' from dual;

END IF;

END STATIONARYITEMCOMAPANYCRUD;

/
--------------------------------------------------------
--  DDL for Procedure STTAIONARY_ROLE_PERMISSION
--------------------------------------------------------
set define off;

  CREATE OR REPLACE EDITIONABLE PROCEDURE "XUSER"."STTAIONARY_ROLE_PERMISSION" 

(DATA_CURSOR out SYS_REFCURSOR,
P_ROLEID  VARCHAR2 DEFAULT null,
P_CLAIMTYPE  VARCHAR2 DEFAULT null,
P_CLAIMVALUE  VARCHAR2 DEFAULT null,
CALLVAL varchar

)AS 
BEGIN
  if(CALLVAL='0')then
  
  insert into STATIONARY_ROLE_CLAIMS(roleid,claimtype,claimvalue)values(P_ROLEID,P_CLAIMTYPE,P_CLAIMVALUE);
  OPEN DATA_CURSOR FOR SELECT 'SUCCESS'FROM DUAL;
  end if;
    if(CALLVAL='1')then
  OPEN DATA_CURSOR FOR SELECT CLAIMTYPE as Type,claimvalue as Value from STATIONARY_ROLE_CLAIMS where roleid=P_ROLEID ;
  
  end if;
    if(CALLVAL='2')then
  delete from STATIONARY_ROLE_CLAIMS where roleid=P_ROLEID and CLAIMTYPE=P_CLAIMTYPE and CLAIMVALUE=P_CLAIMVALUE;
   OPEN DATA_CURSOR FOR SELECT 'SUCCESS'FROM DUAL;
  end if;
END STTAIONARY_ROLE_PERMISSION;

/

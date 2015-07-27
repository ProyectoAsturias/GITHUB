<?php
	include "../Common/php/DBConnection.php";
	function isAccessible($idLayer){

		$_SESSION["userid"];
        $_SESSION["entityid"];

		$queryUser="SELECT count(*) as read FROM layers as l, r_usr_perm as r WHERE l.id_layer=".$idLayer." AND l.acl=r.idacl AND r.idperm=871 AND r.aplica=1 AND userid=".$_SESSION["userid"];
		$result = pg_query($queryUser) or die('Error: '.pg_last_error());
		$row = pg_fetch_row($result);
		$access=false;
		if($row.lenght>0){
			if($row[0]>0)
				$access=true;
		}
		else{
			$quertyGrp="SELECT count(*) as read FROM layers as l, r_group_perm as r, iusergroupuser as i WHERE l.id_layer=".$idLayer." AND l.acl=r.idacl AND r.idperm=871 AND i.userid=".$_SESSION["userid"]." AND i.groupid=r.groupid";
			$result = pg_query($queryGrp) or die('Error: '.pg_last_error());
			$row = pg_fetch_row($result);
			if($row.lenght>0 and $row[0]>0)
				$access=true;
		}
		$connection->dbClose();
	}
?>
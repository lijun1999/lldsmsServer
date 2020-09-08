exports.getChartData = function(req, res,connection) {
    let rd = {
        meta: {},
        data: []
    }
    const nowDate = new Date()
    const year = nowDate.getFullYear()
    const month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1
    const day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
    const date = `${year}-${month}-${day}`
    const yearMonth = `${year}-${month}`
    // 要执行的sql语句
    const sql = `
    SELECT COUNT(*) as num from eq;
    SELECT COUNT(*) as num,state from eq GROUP BY state ORDER BY state;
    SELECT COUNT(*) as num,outdate FROM lend   GROUP BY outdate HAVING outdate like '${yearMonth}%' ORDER BY outdate;
    SELECT COUNT(*) as num,outdate FROM lend where state = '1' GROUP BY outdate HAVING outdate like '${yearMonth}%' ORDER BY outdate;
    SELECT COUNT(*) as num FROM lend  where outdate = '${date}';
    SELECT COUNT(*) as num FROM lend  where outdate like '${yearMonth}%';
    SELECT COUNT(*) as num FROM lend;
    SELECT COUNT(*) as num FROM lend  where outdate = '${date}' and state = '1';
    SELECT COUNT(*) as num FROM lend  where outdate like '${yearMonth}%' and state = '1';
    SELECT COUNT(*) as num FROM lend where state = '1';
    SELECT COUNT(*) as num,ename FROM lend,eq where lend.eid = eq.eid  GROUP BY ename ORDER BY num desc LIMIT 5;
    SELECT uname,ename,lend.eid,lend.state FROM lend,eq,user where lend.eid = eq.eid and lend.uid = user.uid ORDER BY outdate desc LIMIT 10;
    `

    connection.query(sql,  (error, results, fields) =>{
        console.log(results)
        if (error) {
            rd.meta = {
                msg: "未查询到相关内容",
                status: 202
            }
            rd.data = { eq: [], total: 0 }
            return res.send(rd)
        }
        if (results.length === 0) {
            rd.meta = {
                msg: "未查询到相关内容",
                status: 202
            }
            rd.data = { eq: [], total: 0 }
            concat
            return res.send(rd)
        }
        rd.meta = {
            msg: "查询成功",
            status: 200
        }
        rd.data = { eq: results, total: 0 }
        res.send(rd)
    });
}
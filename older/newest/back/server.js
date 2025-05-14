const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const moment = require('moment');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const http = require('http');
// const jwt = require('jsonwebtoken');
require('dotenv').config();




app.use(bodyParser.json());

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'conges',
    password: '26Z8d3j&i',
    database: 'projetdesconges',
  });

  connection.connect();



// login



app.post('/back/login', async (req, res) => {
    const user = req.body;

    // Check admin table
    const adminQuery = `SELECT * FROM admins WHERE email = ? AND pass = ?`;

    connection.query(adminQuery, [user.email, user.pass], (err, adminResults) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({success: false, error: 'Internal Server Error'});
            return;
        }

        if (adminResults.length > 0) {
            // Admin login successful
            const adminUser = adminResults[0];
            res.json({success: true, user: adminUser, role: 'admin'});
        } else {
            const query = 'SELECT * FROM employes WHERE email = ?';
            connection.query(query, [user.email], async (dbError, results) => {
                if (dbError) {
                    console.error('Database query error:', dbError);
                    res.status(500).json({message: 'Internal server error'});
                    return;
                }

                // Check if the user was found
                if (results.length === 0) {
                    res.status(401).json({message: 'Invalid username or password'});
                    return;
                }

                // Extract the user data from the database results

                const hashedPasswordFromDB = results[0].pass;
                const hashedPasswordEntered = sha2Hash(user.pass, 256);

                if (hashedPasswordFromDB === hashedPasswordEntered) {
                    const employeeUser = results[0];
                    res.status(200).json({success: true, user: employeeUser,  role: 'employe', message: 'Login successful'});
                } else {
                    res.status(401).json({success: false, message: 'Invalid username or password'});
                }

            });
            // Check employee table

            // const employeeQuery = `SELECT * FROM employes WHERE email = ? AND pass = ?`;
            //
            // connection.query(employeeQuery, [user.email, user.pass], (err, employeeResults) => {
            //     if (err) {
            //         console.error('Error executing MySQL query:', err);
            //         res.status(500).json({ success: false, error: 'Internal Server Error' });
            //         return;
            //     }
            //
            //     if (employeeResults.length > 0) {
            //         // Employee login successful
            //         const employeeUser = employeeResults[0];
            //         res.json({ success: true, user: employeeUser, role: 'employe' });
            //     } else {
            //         // Failed login
            //         res.json({ success: false, error: 'Invalid credentials' });
            //     }
            // });
        }
    });
});


function sha2Hash(input, bitLength) {
    let crypto= require('node:crypto');
    try {
        const hash = crypto.createHash(`sha${bitLength}`);
        hash.update(input);
        return hash.digest('hex');

    } catch (err) {
        console.error('crypto support is disabled!');
    }

}








// get les jours feries
app.get('/back/joursferies', (req, res) => {
    const sql = 'SELECT * FROM jourferie order by dateJour';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch les jours fériés' });
        } else {
            res.json(results);
        }
    });
});

//  Ajout des jour feriés
app.post('/back/ajoutjour', (req, res) => {
    const jour = req.body;

    // Perform a database query to insert the jour data
    const sql = 'INSERT INTO jourferie (nom, dateJour , mois) VALUES (?,?,?)';
    const values = [jour.nom, jour.dateJour,jour.mois];

    connection.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to add jour' });
        } else {
            const id_j = result.insertId;
            res.status(201).json({ id_j });
        }
    });
});


app.put('/back/modifierjour',(req,res)=>{
    const Jour = req.body
    const sql= 'update jourferie  set nom = ? , dateJour = ? , mois = ? where id_Jour = ?' ;
    const values=[Jour.nom, Jour.dateJour ,Jour.mois ,Jour.id_Jour];

    connection.query(sql,values,(err,result)=>{
        if(err){
            res.status(500).json({ error: 'Failed to add jour' });
        }else{
            const id_Jour = result.id_Jour;
            res.status(201).json(id_Jour)
        }

    })
})

//////////////                l ajoute d'un employe          //////////////
app.post('/back/employe',async (req, res) => {
    const employeData = req.body;
    // console.log('Received employe data:', employeData);



            const sql = 'INSERT INTO employes (nom, prenom, status, tel, email, pass,adresse, cin, dateRecrutement, typeContrat, cnss,fonction) VALUES ( ?, ?, ?, ?, ?, SHA2(?, 256), ?, ?, ?, ?,?,?)';
            const values = [
                employeData.nom, employeData.prenom, employeData.status, employeData.tel,
                employeData.email,employeData.pass ,employeData.adresse,
                employeData.cin, employeData.dateRecrutement, employeData.typeContrat, employeData.cnss,employeData.fonction
            ];

            connection.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Error inserting employe:', err);
                    res.status(500).json({ error: 'Failed to ajouter employe' });
                } else {
                    const idEx = result.insertId;
                    res.status(201).json({ idEx, employeData });
                }
        });



    // Perform a database query to insert the employe data
    });


app.post('/back/emp',(req,res)=>{
    const obj = req.body
    // console.log(obj.id_e)
    const sql = ' select * from employes where id_e = ?'
    connection.query(sql,[obj.id_e],(err,result)=>{
        if(err)
        {
            console.error(err)
            res.status(500).json({ error: 'Failed to recuperer employe' });
            return
        }
        const employeeData = result[0];
        res.status(201).json({
            employeeData: employeeData, // Include the employee data in the response
        });
        console.log(employeeData)
    })
})














app.put('/back/editemploye', (req, res) => {
    const employeData = req.body;
    // console.log(employeData.pass);


    if(employeData.pass==''||employeData.pass==null){
        const sql = 'update employes set nom=?, prenom = ? , status = ? , tel = ? , email = ?, adresse = ? , cin = ? , dateRecrutement = ? , typeContrat = ? , cnss = ? , fonction = ? where id_e = ?';
        const values = [
            employeData.nom, employeData.prenom, employeData.status, employeData.tel,
            employeData.email, employeData.adresse,
            employeData.cin, employeData.dateRecrutement, employeData.typeContrat, employeData.cnss, employeData.fonction ,employeData.id_e
        ];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting employe:', err);
                res.status(500).json({ error: 'Failed to ajouter employe' });
            } else {
                res.status(201).json({message:'employé modifier avec succés', employeData });
            }
        });
    }
    else{
        // Perform a database query to insert the employe data
        const sql = 'update employes set nom=?, prenom = ? , status = ? , tel = ? , email = ? , pass = SHA2(?, 256) , adresse = ? , cin = ? , dateRecrutement = ? , typeContrat = ? , cnss = ? where id_e = ?';
        const values = [
            employeData.nom, employeData.prenom, employeData.status, employeData.tel,
            employeData.email, employeData.pass, employeData.adresse,
            employeData.cin, employeData.dateRecrutement, employeData.typeContrat, employeData.cnss, employeData.id_e
        ];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting employe:', err);
                res.status(500).json({ error: 'Failed to ajouter employe' });
            } else {
                res.status(201).json({message:'employé modifier avec succés', employeData });
            }
        });
    }

});





app.put('/back/accepterconge',async (req,res)=>{
    const demande = req.body
    let dif;
    await calculateNumberOfDays(demande.dateDebut, demande.dateFin)
        .then(result => {
            dif = result;
            // Now you can use the resolved value 'dif' in your code
            console.log('Number of days:', dif);
        })
    const sql ="update conges set etat = 'Approuvé' where id_co = ?"
    const sqlSolde ="select * from employes where id_e = ?"
    const sqlBalance ="update employes set soldeConge = soldeConge - ? where id_e = ?"



    connection.query(sqlSolde,demande.id_e,(err2,result2)=>{
        if(err2){
            console.error('Erreur de changement')
            res.status(500).json({ error: 'Internal server error' });
            return;
        }



            if(dif>result2[0].soldeConge){
                res.status(500).json({ error: 'Internal server error' });
                console.error("Solde d'employe insuffisant :", err2);
            }
            else{
                const employeeData = result2[0];
                connection.query(sql, demande.id_co, (err1, result1) => {
                    if (err1) {
                        console.error('Error updating congé status:', err1);
                        res.status(500).json({error: 'Internal server error'});
                        return;
                    }
                    // res.status(201).json('Le changement a passé avec succès');
                    res.status(201).json({
                        message: 'Le changement a passé avec succès',
                        employeeData: employeeData, // Include the employee data in the response
                    });
                    connection.query(sqlBalance, [dif, demande.id_e], (err3, result3) => {
                        if (err3) {
                            console.error('Error updating remaining days:', err3);
                            res.status(500).json({ error: 'Internal server error' });
                            return;
                        }

                    });
                })
            }
        })


})
// app.put('/back/accepterconge',async (req,res)=>{
//     const demande = req.body
//     let dif;
//     await calculateNumberOfDays(demande.dateDebut, demande.dateFin)
//         .then(result => {
//             dif = result;
//             // Now you can use the resolved value 'dif' in your code
//             console.log('Number of days:', dif);
//         })
//     const sql ="update conges set etat = 'Approuvé' where id_co = ?"
//     const sqlSolde ="select * from employes where id_e = ?"
//     const sqlBalance ="update employes set soldeConge = soldeConge - ? where id_e = ?"
//
//
//     connection.query(sql, demande.id_co, (err1, result1) => {
//         if (err1) {
//             console.error('Error updating congé status:', err1);
//             res.status(500).json({ error: 'Internal server error' });
//             return;
//         }
//
//         connection.query(sqlSolde,demande.id_e,(err2,result2)=>{
//             if(err2){
//                 console.error('Erreur de changement')
//                 res.status(500).json({ error: 'Internal server error' });
//                 return;
//             }
//
//             if(dif>result2[0].soldeConge){
//                 res.status(500).json({ error: 'Internal server error' });
//                 console.error("Solde d'employe insuffisant :", err2);
//             }
//             else{
//                 connection.query(sqlBalance, [dif, demande.id_e], (err3, result3) => {
//                     if (err3) {
//                         console.error('Error updating remaining days:', err3);
//                         res.status(500).json({ error: 'Internal server error' });
//                         return;
//                     }
//
//                     res.status(201).json('Le changement a passé avec succès');
//                 });
//
//             }
//         })
//     });
//
// })







// function calculateNumberOfDays(dateDebut, dateFin) {
//     const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
//     const startDate = new Date(dateDebut);
//     const endDate = new Date(dateFin);
//
//     let daysDifference = 0
//     let currentDate = startDate
//
//     const sql = 'SELECT * FROM jourferie'
//     connection.query(sql,(err,results)=>{
//         if(err){
//             console.error('Erreur de calculation',err)
//         }
//         for (; currentDate < endDate; currentDate.setDate(currentDate.getDate() + 1)) {
//             // Check if the current day and month should be skipped
//             const shouldSkip = results.some(skipDate => {
//                 return currentDate.getDate() === skipDate.dateJour && (currentDate.getMonth() + 1) === skipDate.mois;
//             });
//
//             // If shouldSkip is false, increment daysDifference
//             if (!shouldSkip) {
//                 daysDifference++;
//             }
//         }
//
//         return daysDifference;
//
//     })
//
// }
function calculateNumberOfDays(dateDebut, dateFin) {
    return new Promise((resolve, reject) => {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const startDate = new Date(dateDebut);
        const endDate = new Date(dateFin);

        let daysDifference = 0;
        let currentDate = startDate;

        const sql = 'SELECT * FROM jourferie';
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Erreur de calculation', err);
                reject(err); // Reject the promise in case of an error
                return;
            }

            for (var i=0; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
                var MachiF = false
                // Check if the current day and month should be skipped
                // const shouldSkip = results.some(skipDate => {
                //     return (
                //         currentDate.getDate() === skipDate.dateJour &&
                //         currentDate.getMonth() + 1 === skipDate.mois
                //     );
                // });
                for(var j=0;j<results.length;j++){
                    // console.log('  ||| nhar dyal tarikh :',currentDate.getDate(),' | nhar men sql :',results[j].dateJour)
                    //  console.log(' ||| chhar dyal tarikh : ',currentDate.getMonth()+1,' | chher men sql :',results[j].mois)
                    if(currentDate.getDate()==results[j].dateJour && currentDate.getMonth()+1==results[j].mois){
                    console.log('l3ezz 3otla ')
                    MachiF =true
                }
                }
                       // console.log('  ||| nhar dyal tarikh :',currentDate.getDate(),' | nhar men sql :',results[i].dateJour)
                       //  console.log(' ||| chhar dyal tarikh : ',currentDate.getMonth()+1,' | chher men sql :',results[i].mois)
                       //  console.log(currentDate.getDate())
                       //  console.log(currentDate.getMonth() + 1)
                // console.log(MachiF)
                // console.log(shouldSkip)
                // If shouldSkip is false, increment daysDifference
                if (!MachiF) {
                    daysDifference++;
                }
                i++
            }
            // console.log(results)
            daysDifference=daysDifference-countSundays(dateDebut,dateFin)
            console.log('hada 3adad l7dooda :',countSundays(dateDebut,dateFin))
            resolve(daysDifference); // Resolve the promise with the result
        });
    });
}
function countSundays(startDate, endDate) {
    let current = moment(startDate);
    const end = moment(endDate);
    let count = 0;

    while (current.isBefore(end) || current.isSame(end, 'day')) {
        if (current.day() === 0) {
            // Sunday is represented by 0 in moment.js
            count++;
        }
        current.add(1, 'day');
    }

    return count;
}
app.get('/back/calculate-days', async (req, res) => {
    try {
        const { dateDebut, dateFin } = req.query;

        // Call your calculation functions
        const result = await calculateNumberOfDays(dateDebut, dateFin);



        // Send the result to the frontend
        res.json({ numberOfDays: result });
    } catch (error) {
        console.error('Error in /calculate-days:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// let dif; // Declare 'dif' outside the promise scope
//
// calculateNumberOfDays('2023-06-01', '2023-06-04')
//     .then(result => {
//         // Assign the resolved value to 'dif' inside the promise scope
//         dif = result;
//         console.log('Number of days inside the promise:', dif);
//     })
//     .catch(error => {
//         console.error('Error calculating number of days:', error);
//     });
//
// // 'dif' is not available here (it will be undefined at this point)
// console.log('Number of days outside the promise:', dif);

// Example usage:
// calculateNumberOfDays('2023-06-01', '2023-06-04')
//     .then(result => {
//         console.log('Number of days excluding holidays:', result);
//     })
//     .catch(error => {
//         console.error('Error calculating number of days:', error);
//     });

app.put('/back/refuserconge',(req,res)=>{
    const demande = req.body
    const sqlSolde ="select * from employes where id_e = ?"
    const sql ="update conges set etat = 'Refusé' , raisonRefusion = ? where id_co = ?"
    const values =[demande.raisonRefusion,demande.id_co]
    connection.query(sql,values,(err,result)=>{
        if(err){
            console.error('erreur de changement l etat de congé', err)
            res.status(500).json({error:'erreur de changement l etat de congé'})
        }
        else{
            connection.query(sqlSolde,demande.id_e,(err2,result2)=>{
                if(err2){
                    console.error('Erreur de changement')
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                const employeeData = result2[0];
                res.status(201).json({
                    message: 'Le changement a passé avec succès',
                    employeeData: employeeData, // Include the employee data in the response
                });
            })}
    })

})


/////////////////////////////////////////////////////                      en haut : gestion des jours feries                ///////////////////////////////////////////////


app.get('/back/employe', (req, res) => {
    const sql = 'SELECT * FROM employes';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch les employees' });
        } else {
            res.json(results);
        }
    });
});
app.post('/back/employepage', async(req, res) => {
    const page = parseInt(req.body.page) || 1
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    var total;

    const sql = 'SELECT * FROM employes LIMIT ? OFFSET ?;';
    const values = [pageSize, offset]
    const sqlTotal = "select count(*) as nbr from employes "
    connection.query(sql,values, (err,results)=>{
        if(err){
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        connection.query(sqlTotal,(err2,tot)=>{
            if(err2){
                console.error(err2)
            }
            total=tot[0].nbr
            res.json({res: results,total : total});
        })

    });
});











// get les demandes par id d'employe'


app.post('/back/demandeemp', (req, res) => {
    const emp=req.body

    const sql = 'SELECT *  FROM  conges where id_e = ? order by dateAc desc ';
    connection.query(sql,emp.id_e, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch les demandes des congés' });
        } else {
            res.json(results);
        }
    });
});

app.post('/back/api/demandes', async (req, res) => {
    // const obj = req.body
    const page = parseInt(req.body.page) || 1
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    var total;

    // console.log(page)
    // console.log(obj)
    // console.log(pageSize)
    // console.log(offset)

    const sql = "SELECT conges.*, employes.nom FROM conges inner join employes on conges.id_e = employes.id_e ORDER BY conges.dateAc DESC, conges.etat   LIMIT ? OFFSET ?;"
    // const sql = "SELECT conges.*, employes.nom FROM conges inner join employes on conges.id_e = employes.id_e ORDER BY (conges.etat = 'En Attente') DESC, conges.etat  LIMIT ? OFFSET ?;"
    const values = [pageSize, offset]
    const sqlTotal = "select count(*) as nbr from conges"
    connection.query(sql,values, (err,results)=>{
        if(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        }
        connection.query(sqlTotal,(err2,tot)=>{
            if(err2){
                console.error(err2)
            }
            total=tot[0].nbr
            res.json({res: results,total : total});
        })

    });


});

app.post('/back/demandesemploye', async (req, res) => {
    const obj = req.body
    const page = parseInt(req.body.page) || 1
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    var total;

    // console.log(page)
    // console.log(obj)
    // console.log(pageSize)
    // console.log(offset)

    const sql = "SELECT conges.*, employes.nom FROM conges inner join employes on conges.id_e = employes.id_e where employes.id_e = ? ORDER BY (conges.etat = 'En Attente') DESC, conges.etat  LIMIT ? OFFSET ?;"
    const values = [obj.id_e , pageSize, offset]
    const sqlTotal = "select count(*) as nbr from conges where id_e = ?"
    connection.query(sql,values, (err,results)=>{
        if(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        }
        connection.query(sqlTotal,obj.id_e,(err2,tot)=>{
            if(err2){
                console.error(err2)
            }
            total=tot[0].nbr
            res.json({res: results,total : total});
        })

    });


});
app.get('/back/demandesadmin', (req, res) => {

    const sql = "SELECT conges.*, employes.nom FROM conges inner join employes on conges.id_e = employes.id_e ORDER BY (conges.etat = 'En Attente') DESC, conges.etat;";
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch les demandes des congés' });
        } else {
            res.json(results);
        }
    });
});
app.get('/back/demandesenattente', (req, res) => {

    const sql = "SELECT conges.*, employes.nom FROM conges inner join employes on conges.id_e = employes.id_e where conges.etat = 'En Attente' ";
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch les demandes des congés' });
        } else {
            res.json(results);
        }
    });
});

app.post('/back/demande',(req,res)=>{
    const demande = req.body
    const sql = 'insert into conges (`id_e`, `dateDebut`, `dateFin`, `motif`) values (?,?,?,?)';
        const values =[demande.id_e,
        demande.dateDebut,
        demande.dateFin,
        demande.motif,
            ]
    connection.query(sql,values,(err,results)=>{
        if(err){
            res.status(500).json({error:"La demanade n'a pas ajouté"})
        }
        else{
            res.json(results)
        }
    })
})

app.delete('/back/api/annulerdemande/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM conges WHERE id_co = ?';

    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erreur d'annuler le congé:", err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else {
            res.status(200).json({ success: true, message: 'le demande a ete annulé' });
        }
    });
});







app.get('/back/typecontrat',(req,res)=>{
    const sql = 'select * from typecontrat'
    connection.query(sql,(err,results)=>{
        if(err){
            res.status(500).json({error:"echoué de receptione les type de contrats"})
        }
        else{
            res.json(results)
        }
    })
})


///////////////////////////////////         Confirmation     ///////////////////////////////////////////////


app.post('/back/verpass', (req,res)=>{

    const { id_e, pass, newPass } = req.body;
    const emp = req.body;
    // console.log('Received request with userId:', emp.id_e);
    const sql='SELECT * FROM employes WHERE id_e = ?'

    connection.query(sql, [id_e], (err, results) => {
        if (err) {
            console.error('Error fetching user password:', err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else if (results.length === 0) {
            res.status(404).json({ success: false, message: 'User not found' });
        } else {
            const hashedPasswordFromDB = results[0].pass;

            // Compare old password with the stored hash
            const hashedPasswordEntered = sha2Hash(pass, 256);
            if (hashedPasswordFromDB === hashedPasswordEntered) {
                // Hash the new password before storing it
                const hashedNewPassword = sha2Hash(newPass, 256);

                // Update the user's password in the database
                const updateSql = 'UPDATE employes SET pass = ? WHERE id_e = ?';

                connection.query(updateSql, [hashedNewPassword, id_e], (updateErr) => {
                    if (updateErr) {
                        console.error('Error updating password:', updateErr);
                        res.status(500).json({ success: false, message: 'Internal Server Error' });
                    } else {
                        res.status(200).json({ success: true, message: 'Password updated successfully' });
                    }
                });
            } else {
                res.status(401).json({ success: false, message: 'Invalid old password' });
            }
            // const hashedPasswordEntered = sha2Hash(bod.pass, 256);
                // const hashedPasswordFromDB = results[0].pass;
                // if (hashedPasswordFromDB === hashedPasswordEntered) {
                //     const employeeUser = results[0];
                //     res.status(200).json({success: true, user: employeeUser, message: 'mot de pass compatible'});
                // } else {
                //     res.status(401).json({success: false, message: 'Invalid  password'});
                // }
        }
    });
});
// modifier le mot de pass (ADMIN)
app.post('/back/modifierpass',(req,res)=>{
    // const {id_e,pass} = req.body
    const obj = req.body
    const hashedNewPassword = sha2Hash(obj.pass, 256);
    const sql = "update employes set pass ='"+hashedNewPassword+"' where id_e = "+obj.id_e+" ";
    connection.query(sql,(err,results)=>{
        if(err){
            console.error('Error updating password:', err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        else{
            res.status(200).json({ success: true,data:[hashedNewPassword,obj.id_e], message: 'Password modifié avec succéss' });
        }
    })
})

////        modifier le mot de pass de l'admin

app.post('/back/verpassad', (req,res)=>{

    const { id_ad, pass, newPass } = req.body;
    // console.log('Received request with userId:', emp.id_ad);
    const sql='SELECT * FROM admins WHERE id_ad = ?'

    connection.query(sql, [id_ad], (err, results) => {
        if (err) {
            console.error('Error fetching user password:', err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else if (results.length === 0) {
            res.status(404).json({ success: false, message: 'User not found' });
        } else {
            const PasswordFromDB = results[0].pass;

            if (PasswordFromDB === pass) {

                const updateSql = 'UPDATE admins SET pass = ? WHERE id_ad = ?';

                connection.query(updateSql, [newPass, id_ad], (updateErr) => {
                    if (updateErr) {
                        console.error('Error updating password:', updateErr);
                        res.status(500).json({ success: false, message: 'Internal Server Error' });
                    } else {
                        res.status(200).json({ success: true, message: 'Password updated successfully' });
                    }
                });
            } else {
                res.status(401).json({ success: false, message: 'Invalid old password' });
            }
        }
    });
});



app.get('/back/chart',(req,res)=>{
    const sql =" SELECT MONTH(dateDebut) AS 'mois' , COUNT(*) AS 'conges_count' FROM conges group by mois;"
    connection.query(sql,(err,results)=>{
        if(err){
            console.log('erreur l\'ontention des donneés')
            res.status(500).json({ success: false, message: "erreur l'ontention des donneés" });
        }
        else {
            res.status(200).json({ results});
        }
    })
})

app.post('/back/getsolde',(req,res)=>{
    const obj = req.body
    const sql = 'select soldeConge from employes where id_e = ?'
    // console.log(req.body)
    connection.query(sql,[obj.id_e],(err,results)=>{
        if(err){
            console.error(err , " ereur de recuperer le solde d'employé")
            res.status(500).json({ error: "ereur de recuperer le solde d'employé"});
        }
        else {
            res.status(200).json({ success: true,solde:results, message:'solde recupere avec succés' });
        }
    })
    // connection.query(sql,[id_e],(err,res)=>{
    //     if(err){
    //         console.error(err , " ereur de recuperer le solde d'employé")
    //         res.status(500).json({ error: "ereur de recuperer le solde d'employé" });
    //     }
    //     else {
    //         res.status(200).json({message:'solde recupere avec succés', res });
    //     }
    // })
})







 //////////////////////////////                      Email de verification              /////////////////////////////////////////////

app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'conge.webhi.net',
        port : 25,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: process.env.EMAIL_USER, // Use environment variable
            pass: process.env.EMAIL_PASS, // Use environment variable
        },
    });

    const mailOptions = {
        // from: "yanke.lamouaddan@gmail.com", // Use environment variable
        from: process.env.EMAIL_USER, // Use environment variable
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});







// creation de port

app.listen(3000, () => {
 console.log("server runing in http://localhost:3000");
});
  
// http.createServer(app).listen(process.env.PORT);
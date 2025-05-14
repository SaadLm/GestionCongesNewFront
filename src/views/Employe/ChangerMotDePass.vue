<script>
import axios from 'axios'
import Swal from 'sweetalert2';
import jwt_decode from "jsonwebtoken/decode";
export default {
    data(){
        return{
            oldPass:null,
            newPass:null,
            confirmation:null,
            error:null,
            id_e:null
        }
    },
    methods:{
        confirmer(){
            const bod={
                id_e:this.id_e,
                pass:this.oldPass,
                newPass:this.newPass,
            }

            if(this.newPass == null||this.oldPass==null||this.confirmation== null){
                this.error='Merci de remplir les champs'
            }
            else
            {
                if (this.newPass !== this.confirmation) {
                    this.error = ' Merci de confirmer votre mot de pass '
                    console.log(this.error)
                }
                else{
                    // console.log(bod)
                    axios.post('http://localhost:3000/verpass',bod)
                        .then(response=>{
                            console.log(response.data)
                            this.showSuccessMessage('Votre mot de pass a été modifier avec success !')
                            this.oldPass=''
                            this.newPass=''
                            this.confirmation=''
                            this.error=''
                        })
                        .catch(err=>{
                            console.log(err,'MAchi besse7')
                            this.showErrorMessage('Erreur de changement de mot de pass !')
                        })

                }
            }
        },
        showSuccessMessage(message) {
            this.showAjouter=false
            this.showModifier=false
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: message,
                confirmButtonText: 'OK',
            });
        },
        showErrorMessage(message){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: message,
            });
        },
    },
    mounted() {
        // const user=localStorage.getItem('employe')
        // this.employe=JSON.parse(user);
      const token =localStorage.getItem('token')

      const decodedToken = jwt_decode(token);

        this.id_e=decodedToken.id;
    },
  created() {
    document.title = 'Gestion des congés';
  }
}


</script>

<template>
  <div class="d-flex mt-6 ms-4">
    <h2>Changer le mot de passe :</h2>
  </div>
    <div class="formbold-main-wrapper mt-3">
      <div class="card mb-4 mt-4 p-5" style="width: fit-content;margin: auto">

        <div class="card-body px-0 pt-0 pb-2">
        <div class="formbold-form-wrapper">

            <div class="formbold-form-step-1 active">


                <div>
                    <label > Ancient mot de passe :  </label>
                    <input  v-model="oldPass"
                            type="password"
                            class="formbold-form-input"
                    />
                </div>
<!--                <div class="formbold-input-flex mt-5">-->
              <div class="row mt-3">
                    <div class="col-sm-12 col-md-6">
                        <label > Nouveau mot de passe :</label>
                        <input v-model="newPass"
                               type="password"
                               class="formbold-form-input"
                        />
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <label> Confirmer nouveau mot de passe : </label>
                        <input  v-model="confirmation"
                                type="password"
                                class="formbold-form-input"
                        />
                    </div>
              </div>
<!--                </div>-->

            </div>





            <div class="formbold-form-btn-wrapper"><span class="text-danger fw-bolder">{{ error }}</span>
                <span @click="confirmer" class="formbold-btn" style="background-color: #283777">
                                Confirmer
                            </span>
            </div>

        </div>
          </div>
          </div>

    </div>


</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.shadow-right-bottom {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1); /* Adjust the values as needed */
}
.card{
    border: none;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: "Inter", sans-serif;
}
.formbold-main-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
}

.formbold-form-wrapper {
    margin: 0 auto;
    max-width: 550px;
    width: 100%;

}

.formbold-steps {
    padding-bottom: 18px;
    margin-bottom: 35px;
    border-bottom: 1px solid #DDE3EC;
}
.formbold-steps ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    gap: 40px;
}
.formbold-steps li {
    display: flex;
    align-items: center;
    gap: 14px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #536387;
}
.formbold-steps li span {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #DDE3EC;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #536387;
}
.formbold-steps li.active {
    color: #07074D;;
}
.formbold-steps li.active span {
    background: #6A64F1;
    color: #FFFFFF;
}

.formbold-input-flex {
    display: flex;
    gap: 20px;
    margin-bottom: 22px;
}
.formbold-input-flex > div {
    width: 50%;
}
.formbold-form-input {
    width: 100%;
    padding: 13px 22px;
    border-radius: 5px;
    border: 1px solid #DDE3EC;
    background: #FFFFFF;
    font-weight: 500;
    font-size: 16px;
    color: #536387;
    outline: none;
    resize: none;
}
.formbold-form-input:focus {
    border-color: #6a64f1;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}
.formbold-form-label {
    color: #07074D;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    display: block;
    margin-bottom: 10px;
}

.formbold-form-confirm {
    border-bottom: 1px solid #DDE3EC;
    padding-bottom: 35px;
}
.formbold-form-confirm p {
    font-size: 16px;
    line-height: 24px;
    color: #536387;
    margin-bottom: 22px;
    width: 75%;
}
.formbold-form-confirm > div {
    display: flex;
    gap: 15px;
}

.formbold-confirm-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #FFFFFF;
    border: 0.5px solid #DDE3EC;
    border-radius: 5px;
    font-size: 16px;
    line-height: 24px;
    color: #536387;
    cursor: pointer;
    padding: 10px 20px;
    transition: all .3s ease-in-out;
}
.formbold-confirm-btn {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
}
.formbold-confirm-btn.active {
    background: #6A64F1;
    color: #FFFFFF;
}

.formbold-form-step-1,
.formbold-form-step-2,
.formbold-form-step-3 {
    display: none;
}
.formbold-form-step-1.active,
.formbold-form-step-2.active,
.formbold-form-step-3.active {
    display: block;
}

.formbold-form-btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 25px;
    margin-top: 25px;
}
.formbold-back-btn {
    cursor: pointer;
    background: #FFFFFF;
    border: none;
    color: #07074D;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    display: none;
}
.formbold-back-btn.active {
    display: block;
}
.formbold-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    border-radius: 5px;
    padding: 10px 25px;
    border: none;
    font-weight: 500;
    background-color: #6A64F1;
    color: white;
    cursor: pointer;
}
.formbold-btn:hover {
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}

</style>
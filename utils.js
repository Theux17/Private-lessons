module.exports = {
    // Idade
    age: function(timestamp){
        const today = new Date()
    
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
    
        const month = today.getMonth() - birthDate.getMonth()
        
        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }
        return age 
    
    },

    educationalLevel: function(value){
        if (value == 'medio'){
            return 'Ensino Médio completo'
        } else if (value == 'superior'){
            return 'Ensino Superior Completo'
        } else if (value == 'mestrado'){
            return 'Mestrado'
        } else if (value == 'doutorado'){
            return 'Doutorado'
        }
    },
    
    date: function (timestamp){
        const date = new Date(timestamp)
        const year = `${date.getUTCFullYear()}`
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2) 

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
        
    },

    grade: function(value) {
        if (value == '5EF'){
            return '5° ano do ensino fundamental'
        } else if (value == '6EF'){
            return '6° ano do ensino fundamental'
        } else if (value == '7EF'){
            return '7° ano do ensino fundamental'
        } else if (value == '8EF'){
            return '8° ano do ensino fundamental'
        }else if (value == '9EF'){
            return '9° ano do ensino fundamental'
        } else if (value == '1EM'){
            return '1° ano do ensino médio'
        } else if (value == '2EM'){
            return '2° ano do ensino médio'
        } else if (value == '3EM'){
            return '3° ano do ensino médio'
        }
    }
}

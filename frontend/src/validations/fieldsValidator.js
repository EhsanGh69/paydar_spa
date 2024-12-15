import * as Yup from 'yup'


export const fieldsValidator = (fields) => {
    const fieldsShape = {}
    for (const field of fields) {
        if (field.type !== 'province_county') {
            if (field.required && field.regex === null) {
                if (field.type === 'text')
                    fieldsShape[field.name] = Yup.string().required(`${field.title} الزامی می باشد`)

                if (field.type === 'number')
                    fieldsShape[field.name] = Yup.number()
                    .min(0, `مقدار ${field.title} نمی تواند کمتر از صفر باشد`)
                    .required(`${field.title} الزامی می باشد`)
            }
            else if (!field.required && field.regex !== null) {
                const regex = new RegExp(field.regex)
                fieldsShape[field.name] = Yup.string()
                .matches(regex, `${field.title} وارد شده نا معتبر می باشد`)
            }

            else if (field.required && field.regex !== null) {
                const regex = new RegExp(field.regex)
                fieldsShape[field.name] = Yup.string()
                .required(`${field.title} الزامی می باشد`)
                .matches(regex, `${field.title} وارد شده نا معتبر می باشد`)
            }

            else if (!field.required && field.regex === null) {
                if (field.type === 'text')
                    fieldsShape[field.name] = Yup.string().nullable()

                if (field.type === 'number')
                    fieldsShape[field.name] = Yup.number().nullable()
            }
        }else {
            if (field.required) {
                fieldsShape['province'] = Yup.string().required('انتخاب استان الزامی می باشد')
                fieldsShape['county'] = Yup.string().required('انتخاب شهرستان الزامی می باشد')
            }
            else {
                fieldsShape['province'] = Yup.string().nullable()
                fieldsShape['county'] = Yup.string().nullable()
            }
        }
    }


    return Yup.object().shape({ ...fieldsShape })
}


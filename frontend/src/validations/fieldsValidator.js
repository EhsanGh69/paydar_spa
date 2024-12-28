import * as Yup from 'yup'


export const fieldsValidator = (fields, file = null) => {
    const fieldsShape = {}

    for (const field of fields) {
        const regex = field.regex !== null ? new RegExp(field.regex) : ''

        if (field.type === 'text') {
            if (field.required) {
                if (regex)
                    fieldsShape[field.name] = Yup.string()
                        .matches(regex, `${field.title} وارد شده نا معتبر می باشد`)
                        .required(`${field.title} الزامی می باشد`)
                else
                    fieldsShape[field.name] = Yup.string().required(`${field.title} الزامی می باشد`)
            }
        }

        else if (field.type === 'number') {
            if (field.required)
                fieldsShape[field.name] = Yup.number()
                    .required(`${field.title} الزامی می باشد`)
                    .min(1, `مقدار ${field.title} باید بزرگتر از صفر باشد`)
        }

        else if (field.type === 'province_county') {
            if (field.required) {
                fieldsShape['province'] = Yup.string().required('انتخاب استان الزامی می باشد')
                fieldsShape['county'] = Yup.string().required('انتخاب شهرستان الزامی می باشد')
            }
        }

        else if (field.type === 'file') {
            if (field.required && file === '') {
                fieldsShape[field.name] = Yup.mixed()
                    .test('File', `بارگذاری ${field.title} الزامی می باشد`
                        , (value) => value)
            }
            else if (file !== '') {
                fieldsShape[field.name] = Yup.mixed()
                    .test('Size', "اندازه فایل بارگذاری شده بیشتر از حد مجاز است",
                        (value) => value && value?.size <= 204800)
                    .test('Type', "فرمت فایل بارگذاری شده نامعتبر می باشد",
                        (value) => {
                            return value &&
                                ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(value?.type)
                        })
            }

        }
    }

    return Yup.object().shape({ ...fieldsShape })
}

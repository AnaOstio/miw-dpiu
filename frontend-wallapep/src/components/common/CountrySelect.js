import {modifyStateProperty} from "../../utils/utilsState";
import {Select} from "antd";

let CountrySelect = (props) => {

    let { formData, setFormData } = props

    let selectOptions = [
        {
            label: 'Spain',
            code:  'ES'
        },
        {
            label: 'United Kingdom',
            code: 'GB'
        },
        {
            label: 'France',
            code: 'FR',
        },
        {
            label: 'Portugal',
            code: 'PT'
        }
    ]

    return (
        <Select
            showSearch
            defaultValue={selectOptions[0].label}
            value={formData.country || selectOptions[0].label}
            style={{ width: "100%" }}
            filterOption={(input, option) =>
                (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onChange={(value) => {
                modifyStateProperty(formData, setFormData,
                    "country", value)
            }}
        >
            {selectOptions.map(option => (
                <Select.Option key={option.code} value={option.label}>
                    <img
                        src={`https://flagsapi.com/${option.code}/flat/24.png`}
                        alt={`${option.label} flag`}
                        style={{ width: '20px', marginRight: '8px' }}
                    />
                    {option.label}
                </Select.Option>
            ))}
        </Select>
    )

}

export default CountrySelect;
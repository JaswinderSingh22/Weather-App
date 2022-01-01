import React from 'react'

export const Weather = (props) => {
    return (
        <div className='container text-light' >
            <div className='cards pt-5'>
                <h1>
                    {props.city}
                </h1>
                <h5 className="py-4">
                    <i className={`wi ${props.weatherIcon} display-1`}></i>
                </h5>
                {props.celsius ?(<h1 className='py-2'>{props.celsius}&deg;</h1>):null}
                {minimaxTemp(props.Temp_min,props.Temp_max)}
                <h4 className='py-4'>{props.Description}</h4>
            </div>
        </div>
    )

function minimaxTemp(min,max)
{
    if(min && max)
    {
        return(
            <h3>
            <span className='px-4'>{min}&deg;</span>
            <span className='px-4'>{max}&deg;</span>
        </h3>
        );
    }
}
    
}

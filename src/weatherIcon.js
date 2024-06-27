
const Weathericon = ({iconNo}) => {
    const iconMap = {};
    for (let i=1;i<9;i++)
    {
        iconMap[i] = 'icon' + i + '.png';
    }
    for (let i=11;i<27;i++)
    {
        iconMap[i] = 'icon' + i + '.png';
    }
    for (let i=29;i<45;i++)
    {
        iconMap[i] = 'icon' + i + '.png';
    }
    if (iconMap[iconNo])
    {
        const imgName = "./images/" + iconMap[iconNo];
        return ( 
        <img src={imgName} alt={iconMap[iconNo]}/>
            );
    }
    else
    {
        return "";
    }
    
}

export default Weathericon;
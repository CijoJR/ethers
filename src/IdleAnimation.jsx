import './IdleAnimation.css'


export default function IdleAnimation({color, z, rev, sticky, h, s}){

    return(
        <div className="IAWrapper" style={{zIndex: z ? z : '0', position: sticky?'sticky':'absolute', bottom: 0 , height: h?h:'100%', marginTop: h? `-${h}`:'0'}} >
            <div className="Pillar" style={{background : ` linear-gradient(${rev ? '180deg' : '0deg'}, ${color ? color: 'var(--SY)'} 10%, transparent 70%)` , animationDuration: s?s:'1.5s'}} />
            <div className="Pillar" style={{background : ` linear-gradient(${rev ? '180deg' : '0deg'}, ${color ? color: 'var(--SY)'} 10%, transparent 70%)`, animationDuration: s?s:'1.5s'}} />
            <div className="Pillar" style={{background : ` linear-gradient(${rev ? '180deg' : '0deg'}, ${color ? color: 'var(--SY)'} 10%, transparent 70%)`, animationDuration: s?s:'1.5s'}} />
            <div className="Pillar" style={{background : ` linear-gradient(${rev ? '180deg' : '0deg'}, ${color ? color: 'var(--SY)'} 10%, transparent 70%)`, animationDuration: s?s:'1.5s'}} />
            <div className="Pillar" style={{background : ` linear-gradient(${rev ? '180deg' : '0deg'}, ${color ? color: 'var(--SY)'} 10%, transparent 70%)`, animationDuration: s?s:'1.5s'}} />
            <div className="Pillar" style={{background : ` linear-gradient(${rev ? '180deg' : '0deg'}, ${color ? color: 'var(--SY)'} 10%, transparent 70%)`, animationDuration: s?s:'1.5s'}} />
        </div>
    )
} 
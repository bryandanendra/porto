/*
  Installed from https://reactbits.dev/animations/gradual-blur
*/

import React, { useRef, useMemo } from 'react';
import * as math from 'mathjs';

// Konfigurasi Standar
const DEFAULT_CONFIG = {
    position: 'bottom',
    strength: 2,
    height: '6rem',
    divCount: 5,
    exponential: false,
    zIndex: 1000,
    opacity: 1,
    curve: 'linear',
    target: 'parent',
    className: '',
    style: {}
};

const PRESETS = {
    top: { position: 'top', height: '6rem' },
    bottom: { position: 'bottom', height: '6rem' },
    subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
    intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
    smooth: { height: '8rem', curve: 'bezier', divCount: 10 }
};

const CURVE_FUNCTIONS = {
    linear: p => p,
    bezier: p => p * p * (3 - 2 * p),
    'ease-in': p => p * p,
    'ease-out': p => 1 - Math.pow(1 - p, 2),
};

function GradualBlur(props) {
    const containerRef = useRef(null);

    const config = useMemo(() => {
        const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
        return { ...DEFAULT_CONFIG, ...presetConfig, ...props };
    }, [props]);

    const blurDivs = useMemo(() => {
        const divs = [];
        const increment = 100 / config.divCount;
        const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

        for (let i = 1; i <= config.divCount; i++) {
            let progress = curveFunc(i / config.divCount);
            let blurValue = config.exponential
                ? math.pow(2, progress * 4) * 0.0625 * config.strength
                : 0.0625 * (progress * config.divCount + 1) * config.strength;

            const p1 = (increment * i - increment);
            const p2 = (increment * i);
            const direction = config.position === 'top' ? 'to top' : 'to bottom';

            const divStyle = {
                position: 'absolute',
                inset: '0',
                maskImage: `linear-gradient(${direction}, transparent ${p1}%, black ${p2}%)`,
                WebkitMaskImage: `linear-gradient(${direction}, transparent ${p1}%, black ${p2}%)`,
                backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
                WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
                opacity: config.opacity,
                zIndex: config.zIndex + i
            };

            divs.push(<div key={i} style={divStyle} />);
        }
        return divs;
    }, [config]);

    const containerStyle = {
        position: config.target === 'page' ? 'fixed' : 'absolute',
        left: 0,
        right: 0,
        [config.position]: 0,
        height: config.height,
        pointerEvents: 'none',
        zIndex: config.zIndex,
        ...config.style
    };

    return (
        <div ref={containerRef} className={`gradual-blur ${config.className}`} style={containerStyle}>
            <div style={{ position: 'relative', width: '100%', height: '100%', isolation: 'isolate' }}>
                {blurDivs}
            </div>
        </div>
    );
}

export default React.memo(GradualBlur);

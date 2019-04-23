
import { DirectiveOptions,DirectiveFunction } from 'vue';
import {DirectiveBinding} from 'vue/types/options';
import {VNode} from 'vue';


export const animate:DirectiveOptions = {
    bind:(element:HTMLElement, binding:DirectiveBinding,  vnode: VNode,
        oldVnode: VNode) => {
        const element1 = element as any;
        const defaults = {
            target: 0,
            speed: 500,
            currentIteration: 0,
            iteration: 10
        };
        let config = Object.assign(defaults, binding.value);
        
        // console.log(config);

        const getElementValue = () => Math.round(Number(element1.innerText) || 0);
        const getValue = (percent:any,newconfig:any) => Math.round(((newconfig.target - getElementValue()) * percent) + getElementValue());
        
        const handler = (updatedConfig?:any) => {
            config.currentIteration = 0;
            config = Object.assign(config, updatedConfig);
    
            element1._updateInterval = setInterval(() => {
                element1.innerText = getValue(config.currentIteration / config.iteration,config);
                config.currentIteration = config.currentIteration + 1;
                console.log(config.target);
                console.log(config.currentIteration / config.iteration);
                console.log(getElementValue());
                // console.log(getValue(config.currentIteration / config.iteration));
    
                if (config.currentIteration >= config.iteration) {
                    clearInterval(element1._updateInterval);
                }
    
            }, config.speed / config.iteration);
        };
    
        element1._numberTransitionHandler = handler;
    
        handler();
    },
    update: (element, binding) => {
        const element1 = element as any;
        element1._numberTransitionHandler(binding.value);
    },
    unbind: (element)=> {
        const element1 = element as any;
        clearInterval(element1._updateInterval);
        element1._numberTransitionHandler = null;
    }
}


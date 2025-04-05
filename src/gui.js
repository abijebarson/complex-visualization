import { Pane } from 'tweakpane';
import { changeType } from './core/engine-handler';

export const pane = new Pane();

export const PARAMS = {
    type: "DC",

    dc_res: 10,
    dc_lightness: true,
    dc_l_factor: 0.08,
    dc_scale: 100,
    dc_coords: {real: 0, imag: 0},
    dc_color: "hsl(0, 1, 1)"
}

pane.addBinding(PARAMS, 'type', {options: {DomainColoring: 'DC', VectorPlot: 'VP'}}).on('change', (ev) => {
    console.log(ev.value)
    changeType(ev.value)
});

const dc_folder = pane.addFolder({
    title: 'Domain Coloring Options',
    expanded: false,
})

dc_folder.addBinding(PARAMS, "dc_res", {min: 1, max: 20, step: 1})
dc_folder.addBinding(PARAMS, "dc_lightness")
dc_folder.addBinding(PARAMS, "dc_l_factor", {min: 0, max: 0.1})
dc_folder.addBinding(PARAMS, "dc_scale", {min: 0, max: 1000, step: 1, readonly: true})
// export let gui_dc_coords = dc_folder.addBinding(PARAMS, "dc_coords")
dc_folder.addBinding(PARAMS, "dc_color", {view: 'color', readonly: true})

pane.addBinding(PARAMS.dc_coords, 'real', {readonly: true});
pane.addBinding(PARAMS.dc_coords, 'imag', {readonly: true});
import { Pane } from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { changeType } from './core/engine-handler';
import { max } from 'mathjs';
import { update_all } from './main';
import { fz } from './quill';

export const pane = new Pane();
pane.registerPlugin(EssentialsPlugin);

export const PARAMS = {
    type: "DC",

    dc_res: 10,
    dc_anim: true,
    dc_lightness: true,
    dc_l_factor: 0.08,
    dc_scale: 100,
    dc_coords: {real: 0, imag: 0},
    dc_color: "hsl(0, 1, 1)",

    tdp_type: 'modarg',
    tdp_real: {min: -5, max: 5},
    tdp_imag: {min: -5, max: 5},
    tdp_z: {min: -5, max: 5},
    tdp_segments: 256,
    tdp_transparant: true,

}

const typebinding = pane.addBinding(PARAMS, 'type', {options: {
    DomainColoring: 'DC', 
    VectorPlot: 'VP', 
    ThreeDPlot: "3DP",
}})

const dc_folder = pane.addFolder({
    title: 'Domain Coloring Options',
    expanded: true,
})

dc_folder.addBinding(PARAMS.dc_coords, 'real', {readonly: true});
dc_folder.addBinding(PARAMS.dc_coords, 'imag', {readonly: true});
// dc_folder.addBinding(PARAMS.dc_coords, {readonly: true})
dc_folder.addBinding(PARAMS, "dc_res", {min: 1, max: 20, step: 1})
dc_folder.addBinding(PARAMS, "dc_anim")
dc_folder.addBinding(PARAMS, "dc_lightness")
dc_folder.addBinding(PARAMS, "dc_l_factor", {min: 0, max: 0.1})
dc_folder.addBinding(PARAMS, "dc_scale", {min: 0, max: 1000, step: 1, readonly: true})
// export let gui_dc_coords = dc_folder.addBinding(PARAMS, "dc_coords")
dc_folder.addBinding(PARAMS, "dc_color", {view: 'color', readonly: true})

const tdp_folder = pane.addFolder({
    title: "3D Plot",
    expanded: false
})

tdp_folder.addBinding(PARAMS, "tdp_type", {options: {ReIm: 'reim', ImRe: 'imre', ModArg: "modarg"}}).on('change', () => {update_all(fz)});
tdp_folder.addBinding(PARAMS, "tdp_real", {step: 1,}).on('change', () => {update_all(fz)});
tdp_folder.addBinding(PARAMS, "tdp_imag", {step: 1,}).on('change', () => {update_all(fz)});
tdp_folder.addBinding(PARAMS, "tdp_z", {step: 1,}).on('change', () => {update_all(fz)});
tdp_folder.addBinding(PARAMS, "tdp_segments", {step: 1}).on('change', () => {update_all(fz)});
tdp_folder.addBinding(PARAMS, "tdp_transparant").on('change', () => {update_all(fz)});

typebinding.on('change', (ev) => {
    changeType(ev.value)
    switch (ev.value){
        case "DC":
            dc_folder.expanded = true
            tdp_folder.expanded = false
            break;
        case "3DP":
            dc_folder.expanded = false
            tdp_folder.expanded = true
            break;
        default:
            dc_folder.expanded = false
            tdp_folder.expanded = false
    }
});
export default{
    base: process.env.NODE_ENV === 'production' ? '/complex-visualization/' : '',
    build: {
        rollupOptions: {
            output:{
                manualChunks(id) {
                    // if (id.includes('node_modules')) {
                    //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    // }
                    if (id.includes('node_modules/mathjs')) {
                        return id.toString().split('node_modules/mathjs/')[1].split('/')[0].toString();
                    }
                    if (id.includes('node_modules/three')) {
                        return id.toString().split('node_modules/three/')[1].split('/')[0].toString();
                    }
                    // if (id.includes('tex-math-parser')) {
                    //     return id.toString().split('tex-math-parser/')[1].split('/')[0].toString();
                    // }
                    // if (id.includes('node_modules/tweakpane')) {
                    //     return id.toString().split('node_modules/tweakpane/')[1].split('/')[0].toString();
                    // }
                }
            }
        }
    }
}
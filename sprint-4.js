function addSpec(prod,spec,detail){
    if (spec in prod) {
        return "Spec already added"
    } else {
        prod[spec] = detail
        return prod
    }
}

function modSpec(prod, spec, detail) {
    if (spec in prod) {
        prod[spec] = detail
        return prod
    } else {
        return "This spec does not exist"
    }
}

function delSpec(prod, spec) {
    if (spec in prod) {
        prod.delete(spec)
        return prod
    } else {
        return "This spec does not exist"
    }
}
module.exports = [addSpec, modSpec, delSpec]
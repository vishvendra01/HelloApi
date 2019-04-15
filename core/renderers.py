import json

from rest_framework.renderers import JSONRenderer


class CoreJSONRenderer(JSONRenderer):
    charset = 'utf-8'
    object_label = 'result'
    success_label = 'success'
    message_label = 'message'

    def render(self, data, media_type=None, renderer_context=None):
        print(data)
        if 'detail' in data:
            return json.dumps({
                self.success_label: False,
                self.message_label: data['detail']
            })

        else:
            return json.dumps({
                self.object_label: data,
                self.success_label: False,
                self.message_label: ""
            })
    
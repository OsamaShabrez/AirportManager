<?php
namespace App\Controller;

class AirlinesController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }

    public function index()
    {
        $airlines = $this->Airlines->find('all');
        $this->set([
            'airlines' => $airlines,
            '_serialize' => ['airlines']
        ]);
    }

    public function view($id)
    {
        $airline = $this->Airlines->get($id);
        $this->set([
            'airline' => $airline,
            '_serialize' => ['airline']
        ]);
    }

    public function add()
    {
        $airline = $this->Airlines->newEntity($this->request->getData());
        if ($this->Airlines->save($airline)) {
            $message = 'Saved';
        } else {
            $message = 'Error';
        }
        $this->set([
            'message' => $message,
            'airline' => $airline,
            '_serialize' => ['message', 'airline']
        ]);
    }

    public function edit($id)
    {
        $airline = $this->Airlines->get($id);
        if ($this->request->is(['post', 'put'])) {
            $airline = $this->Airlines->patchEntity($airline, $this->request->getData());
            if ($this->Airlines->save($airline)) {
                $message = 'Saved';
            } else {
                $message = 'Error';
            }
        }
        $this->set([
            'message' => $message,
            '_serialize' => ['message']
        ]);
    }

    public function delete($id)
    {
        $airline = $this->Airlines->get($id);
        $message = 'Deleted';
        if (!$this->Airlines->delete($airline)) {
            $message = 'Error';
        }
        $this->set([
            'message' => $message,
            '_serialize' => ['message']
        ]);
    }
}

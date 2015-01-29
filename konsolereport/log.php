<?php
class KonsoleReport
{
    //--------------------------------------------------------------------------
    //
    //  Initialization
    //
    //--------------------------------------------------------------------------
    public function __construct()
    {
        $request_method = strtolower($_SERVER['REQUEST_METHOD']);
        if ($request_method == 'post' && isset($_POST['data']))
            $this->postReport($_POST['data']);
        else if ($request_method == 'get')
            $this->getReport();
    }
    //--------------------------------------------------------------------------
    //
    //  Methods
    //
    //--------------------------------------------------------------------------

    protected function getReport()
    {
        if (isset($_GET['d']))
        {
            $filename = 'logs/kr_'.$_GET['d'].'.log';
            if (file_exists($filename)) {
                $entries = (is_readable($filename)) ? $this->getJson($filename) : array();
            }
            else {
                $filename = array_pop(glob("logs/*.log"));
                $entries = (is_readable($filename)) ? $this->getJson($filename) : array();
            }
            if (is_array($entries))
                $entries = array_reverse($entries);
            echo json_encode($entries);
        }
    }

    protected function postReport($json_string)
    {
        $request_data = json_decode($json_string);
        $filename = 'logs/kr_'.date('Ymd').'.log';
        $entries = (file_exists($filename)) ? $this->getJson($filename) : array();
        $entry = new stdClass();
        $entry->time = time();
        foreach ($request_data as $property => $value)
            $entry->{$property} = $value;

        if (is_array($entries))
        {
            array_push($entries, $entry);
            $store_string = json_encode($entries);
            $this->saveFile($filename, $store_string);
        }
    }

    //----------------------------------
    //  File Methods
    //----------------------------------

    protected function getJson($path)
    {
        $str = $this->load_txtfile($path);
        $str = preg_replace('!/\*.*?\*/!s', '', $str);
        $str = preg_replace('/\n\s*\n/', "\n", $str);
        $data = json_decode($str);
        if (empty($data))
            return new stdClass();
        return $data;
    }

    protected function saveFile($path, $data)
    {
        $handle = fopen($path,'w');
        fwrite($handle, $data);
        fclose($handle);
    }

    protected function load_txtfile($path)
    {
        $handle = @fopen($path, 'r');
        $str = @fread($handle, @filesize($path));
        @fclose($handle);
        return $str;
    }
}

new KonsoleReport();